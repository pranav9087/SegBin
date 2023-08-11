# SegBin.AI by TerraVortex

- [Project summary](#project-summary)
  - [The issue we are hoping to solve](#the-issue-we-are-hoping-to-solve)
  - [How our technology solution can help](#how-our-technology-solution-can-help)
  - [Our idea](#our-idea)
- [Technology implementation](#technology-implementation)
  - [IBM AI service(s) used](#ibm-ai-services-used)
  - [Other IBM technology used](#other-ibm-technology-used)
  - [Solution architecture](#solution-architecture)
- [Presentation materials](#presentation-materials)
  - [Solution demo video](#solution-demo-video)
  - [Project development roadmap](#project-development-roadmap)
- [Additional details](#additional-details)
  - [How to run the project](#how-to-run-the-project)
  - [Live demo](#live-demo)

_INSTRUCTIONS: Complete all required deliverable sections below._

## Project summary

### The issue we are hoping to solve

Improper waste segregation poses significant environmental and financial challenges. In colleges, even students often neglect to separate waste correctly, leading to damaged recyclables, increased landfill waste, and the labor-intensive task of sorting improperly discarded waste. This issue extends beyond universities, indicating a larger problem with waste management globally. The current approach of replacing traditional single-bin systems with costly three-bin recycling bins has improved diversion rates but falls short of expectations. Financial burdens arise from the need to hire workers for manual waste sorting. To address this problem, we developed a cost-effective solution that ensures minimal damage to recyclables by sorting waste at the point of disposal.

### How our technology solution can help

Smart waste sorting alternative to dustbins with AI, data insights, and revenue optimization.

### Our idea

TerraVortex is proud to introduce two innovative waste management solutions: SegBin lite and SegBin X. SegBin lite is a sleek, plate-shaped device that can be placed on existing dustbins, offering automated waste sorting. Equipped with four adjustable openings, each corresponding to a waste category (plastic products, food waste, metals, and office products), SegBin lite utilizes a wide angle Full HD camera module and an infrared sensor. Users simply hold the trash above the camera for a few seconds, allowing our advanced algorithm to analyze the photo and open the appropriate hole for disposal.
Alternatively, along with all the features discussed SegBin X adds a smart separator system. Users can conveniently dispose of all their waste through the central hole, and our product automatically separates and sorts the items accordingly. Both solutions come with a comprehensive data analysis dashboard, empowering users with insights into their disposal trends. Leveraging AI-driven analytics, data visualization, and predictive modeling, customers gain valuable information on waste composition. Furthermore, our AI-powered chatbot offers suggestions on maximizing the use of each waste type. Additionally, our platform features an auction system connecting customers with waste buyers, optimizing their potential revenue.

## Technology implementation

### IBM AI service(s) used

_INSTRUCTIONS: Included here is a list of commonly used IBM AI services. Remove any services you did not use, or add others from the linked catalog not already listed here. Leave only those included in your solution code. Provide details on where and how you used each IBM AI service to help judges review your implementation. Remove these instructions._

- [IBM Natural Language Understanding](https://cloud.ibm.com/catalog/services/natural-language-understanding) - WHERE AND HOW THIS IS USED IN OUR SOLUTION
- [Watson Assistant](https://cloud.ibm.com/catalog/services/watson-assistant) - WHERE AND HOW THIS IS USED IN OUR SOLUTION
- [Watson Discovery](https://cloud.ibm.com/catalog/services/watson-discovery) - WHERE AND HOW THIS IS USED IN OUR SOLUTION
- [Watson Speech to Text](https://cloud.ibm.com/catalog/services/speech-to-text) - WHERE AND HOW THIS IS USED IN OUR SOLUTION
- [Watson Text to Speech](https://cloud.ibm.com/catalog/services/text-to-speech) - WHERE AND HOW THIS IS USED IN OUR SOLUTION
- List any additional [IBM AI services](https://cloud.ibm.com/catalog?category=ai#services) used or remove this line

### Other IBM technology used

INSTRUCTIONS: List any other IBM technology used in your solution and describe how each component was used. If you can provide links to/details on exactly where these were used in your code, that would help the judges review your submission.

### Solution architecture

Diagram and step-by-step description of the flow of our solution:

![Solution Architecture](https://raw.githubusercontent.com/SegBin-ai/IBM-CFC-2023/main/images/Solution%20Architecture.jpeg)

1. The user navigates to the site and uploads a video file.
2. Watson Speech to Text processes the audio and extracts the text.
3. Watson Translation (optionally) can translate the text to the desired language.
4. The app stores the translated text as a document within Object Storage.

## Presentation materials

_INSTRUCTIONS: The following deliverables should be officially posted to your My Team > Submissions section of the [Call for Code Global Challenge resources site](https://cfc-prod.skillsnetwork.site/), but you can also include them here for completeness. Replace the examples seen here with your own deliverable links._

### Solution demo video

https://www.youtube.com/watch?v=xi4odXWze9k

Feel free to watch the video by clicking on the image above.


### Project development roadmap

The project currently does the following things.

- Feature 1
- Feature 2
- Feature 3

In the future we plan to...

See below for our proposed schedule on next steps after Call for Code 2023 submission.

https://github.com/SegBin-ai/IBM-CFC-2023/blob/main/5-year%20plan.pdf

## Additional details

_INSTRUCTIONS: The following deliverables are suggested, but **optional**. Additional details like this can help the judges better review your solution. Remove any sections you are not using._

### How to run the project

INSTRUCTIONS: In this section you add the instructions to run your project on your local machine for development and testing purposes. You can also add instructions on how to deploy the project in production.

### Live demo

You can find a running system to test at...

See our [description document](./docs/DESCRIPTION.md) for log in credentials.

---

### Authors

- Aaditya Voruganti
- Pranav Chandra Varma Penmatcha
