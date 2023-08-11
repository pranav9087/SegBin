# export PROTOCOL_BUFFERS_PYTHON_IMPLEMENTATION=python
# Import necessary libraries
from ibmcloudant.cloudant_v1 import CloudantV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
import cv2
import pymongo
import datetime
from PIL import ImageFont, ImageDraw, Image
from pymongo import MongoClient
import paho.mqtt.client as mqtt
import urllib.parse
from pymongo import MongoClient
import json
import cv2
import matplotlib.pyplot as plt
import numpy as np
from six import BytesIO
from PIL import Image
import tensorflow as tf
import tensorflow_hub as hub
from object_detection.utils import label_map_util
from object_detection.utils import visualization_utils as viz_utils
from object_detection.utils import ops as utils_ops
import ssl
from urllib.request import urlopen
import uuid
import socket

# Set MQTT broker information (using Mosquitto broker)
mqtt_broker = "localhost"  # Replace with the address of your Mosquitto broker
mqtt_port = 1883  # Default MQTT port
mqtt_topic = "waste_detection"  # Replace with the desired MQTT topic

# Create an MQTT client instance
mqtt_client = mqtt.Client()

# Connect to the MQTT broker
mqtt_client.connect(mqtt_broker, mqtt_port)

def get_mac_address():
    try:
        mac_address = uuid.UUID(int=uuid.getnode()).hex[-12:]
    except Exception as e:
        print("Error getting MAC address:", e)
        return None

    return ":".join([mac_address[i:i+2] for i in range(0, 12, 2)])


# Update the Cloudant credentials
credentials = {
    "apikey": "tmSRIS_CQp3vRDKNqaRgMjaGTMV9MNkYvmKlhejpMKxG",
    "url": "https://d66297a5-6c29-485c-840e-5903af9a45f7-bluemix.cloudantnosqldb.appdomain.cloud",
    "username": "apikey-v2-tuy7g6x55ttl869okke0el42d5ljflybly5txrxy3is"
}

# Create an IAM Authenticator
authenticator = IAMAuthenticator(credentials['apikey'])

# Create a Cloudant client
client = CloudantV1(authenticator=authenticator)
client.set_service_url(credentials['url'])

# Specify the database name
database_name = "test"  # Replace 'your_database_name' with the desired database name

# Get the existing databases to check if the specified database exists
response = client.get_all_dbs().get_result()
if database_name not in response:
    # If the specified database doesn't exist, create it
    response = client.put_database(db=database_name).get_result()

# # Escape username and password
# username = urllib.parse.quote_plus('av34')
# password = urllib.parse.quote_plus('test12345')

# # Construct the MongoDB URI with escaped username and password
# uri = f"mongodb+srv://{username}:{password}@cluster0.w52bjm1.mongodb.net/"

# # Establish a connection to MongoDB
# client = MongoClient(uri)

# # Create or access the database
# db = client['SegBin']  # Replace 'my_database' with the desired database name

# # Create or access the collection
# collection = db['test']  # Replace 'my_collection' with the desired collection name

# Rest of the code...


def capture_image():
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("Failed to open webcam")
        return
    ret, frame = cap.read()
    if not ret:
        print("Failed to capture image")
        return
    cv2.imshow("Captured Image", frame)
    cv2.imwrite("Science_plastic.jpg", frame)
    cap.release()
    cv2.destroyAllWindows()


ALL_MODELS = {
'material_model' : 'material/saved_model/saved_model'
# 'material_form_model' : '/Users/aadityavoruganti/SegBin.ai/Image-classfication/Image-classfication Backend/material_form/saved_model/saved_model/',
# 'plastic_model' : '/Users/aadityavoruganti/SegBin.ai/Image-classfication/Image-classfication Backend/plastic_type/saved_model/saved_model/'
}

def normalize_image(image,
                    offset=(0.485, 0.456, 0.406),
                    scale=(0.229, 0.224, 0.225)):
  with tf.name_scope('normalize_image'):
    image = tf.image.convert_image_dtype(image, dtype=tf.float32)
    offset = tf.constant(offset)
    offset = tf.expand_dims(offset, axis=0)
    offset = tf.expand_dims(offset, axis=0)
    image -= offset

    scale = tf.constant(scale)
    scale = tf.expand_dims(scale, axis=0)
    scale = tf.expand_dims(scale, axis=0)
    image /= scale
    return image


def load_image_into_numpy_array(path, target_size=(1024, 512)):
    image = None
    if path.startswith('http'):
        response = urlopen(path)
        image_data = response.read()
        image_data = BytesIO(image_data)
        image = Image.open(image_data)
    else:
        image_data = tf.io.gfile.GFile(path, 'rb').read()
        image = Image.open(BytesIO(image_data))
    image = image.resize(target_size)
    if image.mode == 'RGBA':
        image = image.convert('RGB')
    image_np = np.array(image)
    image_np_expanded = np.expand_dims(image_np, axis=0)

    return image_np_expanded.astype(np.uint8)

def build_inputs_for_segmentation(image):
    image = normalize_image(image)
    return image

model_display_name = 'material_model' # @param ['material_model','material_form_model','plastic_model']
model_handle = ALL_MODELS[model_display_name]

print('Selected model:'+ model_display_name)
print('Model Handle at TensorFlow Hub: {}'.format(model_handle))

if model_display_name == 'material_model':
  PATH_TO_LABELS = 'material/material_labels.pbtxt'
# elif model_display_name == 'material_form_model':
#   PATH_TO_LABELS = '/Users/aadityavoruganti/SegBin.ai/Image-classfication/Image-classfication Backend/models/official/projects/waste_identification_ml/pre_processing/config/data/material_form_labels.pbtxt'
# elif model_display_name == 'plastic_model':
#   PATH_TO_LABELS = '/Users/aadityavoruganti/SegBin.ai/Image-classfication/Image-classfication Backend/models/official/projects/waste_identification_ml/pre_processing/config/data/plastic_type_labels.pbtxt'

print('Labels selected for',model_display_name)
print('\n')
category_index = label_map_util.create_category_index_from_labelmap(PATH_TO_LABELS, use_display_name=True)
category_index

# Define the condensed labels mapping
condensed_labels = {
    1: 'Soil, bits of concrete and stones',
    2: 'Discarded clothing, carpet, sheets and towels',
    3: 'Rubber and leather products such as clothing footwear, tires, gaskets and furniture',
    4: 'Wood products such as cabinets, furniture, and packaging like crates and pallets',
    5: 'Residential, commercial (supermarkets, food wholesale, restaurants, hotels, sports venues) and institutional (hospitals, offices, universities, schools, food banks) food waste',
    6: 'Plastic products such as bags, sacks, wraps, cups, bottles, jugs, containers, lids, utensils, medical devices and household items',
    7: 'Grass, leaves and tree and brush trimmings from residential, institutional and commercial sources',
    8: 'Cardboard products such as office papers, newspapers, tissue paper, paper plates, cups, corrugated boxes, milk cartons, and bags and sacks',
    9: 'Glass products such as beer and soft drink bottles, wine and liquor bottles, and bottles or jars for food, cosmetics and other products',
    10: 'Ferrous (iron and steel), non-ferrous (lead, copper and zinc) and aluminum products such as containers, packaging, appliances, batteries, electronics and furniture'
}


print('loading model...')
hub_model = hub.load(model_handle)
print('model loaded!')

while True:

    if __name__ == '__main__':
        cap = cv2.VideoCapture(0)
        if not cap.isOpened():
            print("Failed to open webcam")
            exit()
        while True:
            ret, frame = cap.read()
            if not ret:
                print("Failed to capture image")
                break
            cv2.imshow("Webcam", frame)
            if cv2.waitKey(1) & 0xFF == ord('c'):
                cv2.imwrite("Science_plastic.jpg", frame)
                print("Image captured!")
                break
        cap.release()
        cv2.destroyAllWindows()

    IMAGES_FOR_TEST = {
    'TestImage' : 'Science_plastic.jpg'
    } 

    selected_image = "TestImage" #@param ["Image1", "TestImage"]
    flip_image_horizontally = False #@param {type:"boolean"}
    convert_image_to_grayscale = False #@param {type:"boolean"}

    image_path = IMAGES_FOR_TEST[selected_image]
    image_np = load_image_into_numpy_array(image_path)

    if(flip_image_horizontally):
        image_np[0] = np.fliplr(image_np[0]).copy()

    if(convert_image_to_grayscale):
        image_np[0] = np.tile(
        np.mean(image_np[0], 2, keepdims=True), (1, 1, 3)).astype(np.uint8)

    print('min:',np.min(image_np[0]), 'max:', np.max(image_np[0]))
    plt.figure(figsize=(24,32))
    plt.imshow(image_np[0])
    # plt.savefig('figurepreprocess.png') 
    # plt.show()
    plt.close()  # Close the figure

    hub_model_fn = hub_model.signatures["serving_default"]
    height=hub_model_fn.structured_input_signature[1]['inputs'].shape[1]
    width = hub_model_fn.structured_input_signature[1]['inputs'].shape[2]
    input_size = (height, width)
    print(input_size)

    image_np_cp = cv2.resize(image_np[0], input_size[::-1], interpolation = cv2.INTER_AREA)
    image_np = build_inputs_for_segmentation(image_np_cp)
    image_np = tf.expand_dims(image_np, axis=0)
    image_np.get_shape()

    plt.figure(figsize=(24,32))
    plt.imshow(image_np[0])
    # plt.savefig('figureprocessed.png')
    # plt.show()
    plt.close()  # Close the figure

    results = hub_model_fn(image_np)
    result = {key:value.numpy() for key,value in results.items()}
    print(result.keys())

    label_id_offset = 0
    min_score_thresh =0.6
    use_normalized_coordinates=True

    if use_normalized_coordinates:
        result['detection_boxes'][0][:,[0,2]] /= height
        result['detection_boxes'][0][:,[1,3]] /= width

    if 'detection_masks' in result:
        detection_masks = tf.convert_to_tensor(result['detection_masks'][0])
        detection_boxes = tf.convert_to_tensor(result['detection_boxes'][0])
        detection_masks_reframed = utils_ops.reframe_box_masks_to_image_masks(
                    detection_masks, detection_boxes,
                    image_np.shape[1], image_np.shape[2])
        detection_masks_reframed = tf.cast(detection_masks_reframed > 0.5,
                                            np.uint8)
        result['detection_masks_reframed'] = detection_masks_reframed.numpy()



    mask_count = np.sum(result['detection_scores'][0] >= min_score_thresh)
    print('Total number of objects found are:', mask_count)
    mask = np.zeros_like(detection_masks_reframed[0])
    for i in range(mask_count):
        if result['detection_scores'][0][i] >= min_score_thresh:
            mask += detection_masks_reframed[i]

    mask = tf.clip_by_value(mask, 0,1)
    plt.figure(figsize=(24,32))
    plt.imshow(mask,cmap='gray')
    # plt.savefig('figuremask.png')
    # plt.show()
    plt.close()  # Close the figure

    detected_labels = []
    for i in range(mask_count):
        if result['detection_scores'][0][i] >= min_score_thresh:
            label = category_index[result['detection_classes'][0][i] + label_id_offset]['name']
            detected_labels.append(label)

    detection_scores = result['detection_scores'][0]
    detected_scores = detection_scores[:mask_count]

    total_score = np.sum(detected_scores)
    accuracy_percentages = [score / total_score * 100 for score in detected_scores]

    for label, accuracy in zip(detected_labels, accuracy_percentages):
        print(f"Detected object: {label}, Accuracy: {accuracy:.2f}%")

    # Get the current date and time
    current_datetime = datetime.datetime.now()

    if __name__ == "__main__":
        mac_address = get_mac_address()

    # ... Previous code ...

    # Convert datetime to string representation
    current_datetime_str = current_datetime.isoformat()

    # Create a dictionary for the JSON packet
    json_packet = {
        'mac_address': mac_address,
        'timestamp': current_datetime_str,
        'detected_objects': []
    }

    # Define the labels for each waste category
    Category1_Labels = [
        'Soil, bits of concrete and stones',
        'Grass, leaves and tree and brush trimmings',
        'Residential, commercial and institutional food waste'
    ]

    Category2_Labels = [
        'Cardboard products such as office papers, newspapers, tissue paper, paper plates, cups, corrugated boxes, milk cartons, and bags and sacks'
        # Add more labels for Category 2 as needed
    ]

    Category3_Labels = [
        'Plastic products such as bags, sacks, wraps, cups, bottles, jugs, containers, lids, utensils, medical devices and household items',
        'Rubber and leather products such as clothing footwear, tires, gaskets and furniture'
        # Add more labels for Category 3 as needed
    ]

    Category4_Labels = [
        'Wood products such as cabinets, furniture, and packaging like crates and pallets',
        'Discarded clothing, carpet, sheets and towels',
        'Glass products such as beer and soft drink bottles, wine and liquor bottles, and bottles or jars for food, cosmetics and other products',
        'Ferrous (iron and steel), non-ferrous (lead, copper and zinc) and aluminum products such as containers, packaging, appliances, batteries, electronics and furniture'
        # Add more labels for Category 4 as needed
    ]

    # Inside the for loop for detected labels and accuracy
    for i in range(mask_count):
        if result['detection_scores'][0][i] >= min_score_thresh:
            label_id = result['detection_classes'][0][i] + label_id_offset
            accuracy = accuracy_percentages[i]

            # Get the corresponding condensed label or use 'Unknown' if not found
            condensed_label = condensed_labels.get(label_id, 'Unknown')
            print(f"Detected object: {condensed_label}, Accuracy: {accuracy:.2f}%")

            # Determine the waste category based on the detected label
            waste_category = None
            if condensed_label in Category1_Labels:
                waste_category = 'Category 1: Organic and Biodegradable Waste'
            elif condensed_label in Category2_Labels:
                waste_category = 'Category 2: Paper and Cardboard Waste'
            elif condensed_label in Category3_Labels:
                waste_category = 'Category 3: Plastics and Rubber Waste'
            elif condensed_label in Category4_Labels:
                waste_category = 'Category 4: Metal and Glass Waste'

            if waste_category:
                print(f"Waste Category: {waste_category}")

            # Create a dictionary for the detected object
            detected_object = {
                'label': condensed_label,
                'accuracy': accuracy,
                'waste_category': waste_category
            }

            # Append the detected object to the JSON packet
            json_packet['detected_objects'].append(detected_object)

    # ... Rest of the code ...



    # # Insert the JSON packet into the collection
    # collection.insert_one(json_packet)

    # Push the JSON packet to the database
    response = client.post_document(db=database_name, document=json_packet).get_result()

    # Publish the JSON packet to the MQTT topic
    mqtt_payload = json.dumps(json_packet)  # Convert the JSON packet to a string
    mqtt_client.publish(mqtt_topic, mqtt_payload)

    # Print the response to verify if the document was successfully inserted
    print(response)



