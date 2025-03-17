# Amazon Reviews Sentiment Analyzer

## Introduction
**Amazon Review Sentiment Analyzer** is a web application that makes it easy to gauge what people think about a product at a glance. It automatically scrapes customer reviews from an Amazon product page and analyzes their sentiment using a hybrid model (BERT + VADER). The result is a quick overview of how many reviews are positive, neutral, or negative, along with a concise summary of common themes in the feedback. This saves you time from scrolling through countless reviews by highlighting the overall opinion in just a few seconds.

## Features
- **Amazon Review Scraping**: Give the app an Amazon product URL, and it will fetch a batch of the latest product reviews for analysis.
- **Hybrid Sentiment Analysis**: Uses a combination of **BERT** (a Transformer-based ML model) and **VADER** (a rule-based sentiment tool) to classify each review as positive, negative, or neutral. This hybrid approach captures both nuanced language understanding and straightforward sentiment cues for better accuracy.
- **Sentiment Breakdown**: After analysis, the app displays the percentage of reviews that are positive, negative, and neutral. You can quickly see if the majority of customers love or hate the product (or if opinions are mixed).
- **Review Summary**: Generates a short summary highlighting the key points from all the reviews. The summary mentions common praises or complaints, giving you the gist of what people are saying.
- **Full-Stack Web App**: Includes a friendly **React** front-end for entering the URL and viewing results, and a **Flask** back-end API that handles scraping and analysis behind the scenes.

## Installation & Setup
To run the project locally, you'll need to set up both the Flask back-end and the React front-end. Make sure you have **Python 3** (for the back-end) and **Node.js** with **npm** (for the front-end) installed on your system.

### Backend (Flask)
1. **Clone the repository** and navigate to the back-end project folder (if the repo is split into separate folders for front-end and back-end, go to the back-end directory).
2. **Install dependencies**: It's recommended to use a virtual environment. Then install the required Python libraries:
   ```bash
   pip install -r requirements.txt
   ```
   This will install Flask, BeautifulSoup, Requests, Transformers (for BERT), vaderSentiment, OpenAI API client, etc.
3. **Configure API Key**: The app uses OpenAI's API to generate the review summary. Obtain an OpenAI API key and set it as an environment variable (e.g. `OPENAI_API_KEY`) or insert it into the code where required.
4. **Run the Flask app**: Start the Flask server (for example, with `flask run` or by running the Python file that initiates the app). By default, it should start on **http://localhost:5000**.

### Frontend (React)
1. Navigate to the front-end project folder (usually containing the React app, e.g. a folder with `package.json`).
2. **Install front-end dependencies** by running:
   ```bash
   npm install
   ```
   This will install React and any other necessary JavaScript packages.
3. **Start the development server**:
   ```bash
   npm start
   ```
   This runs the app in development mode. Open **http://localhost:3000** in your browser to view the interface. (The React app will likely proxy API requests to the Flask backend on port 5000.)

Now you should have both the front-end and back-end running locally. The React app will provide the UI and communicate with the Flask API for data.

## Usage
Using the Amazon Review Sentiment Analyzer is straightforward:
1. **Open the app** in your web browser (http://localhost:3000 if running locally). You’ll see a simple interface with an input field.
2. **Enter an Amazon product URL** into the input field. For example, you can copy the URL of a product’s page from your browser (make sure it's a direct link to a product page, not a search results page).
3. **Submit/Analyze**: Click the "Analyze" button (or whatever the UI provides) to start the analysis. The app will begin scraping reviews from that product page. This may take a few moments if it’s fetching many reviews.
4. **View the Results**: Once analysis is complete, the page will display:
   - **Sentiment Percentages**: You’ll see something like _X% Positive, Y% Negative, Z% Neutral_, indicating the proportion of reviews in each sentiment category.
   - **Summary of Reviews**: A few sentences summarizing the common sentiments. For example, the summary might say *"Most users loved the battery life and screen quality, though some complained about the price. Several reviewers found the setup easy, and overall sentiment is very positive."* This gives you a quick understanding of the general consensus.
5. **Interpret the insights**: Use the percentages to gauge overall satisfaction (a high positive percentage is a good sign, a high negative percentage might be a warning). Read the summary to catch key points like frequent pros or cons mentioned by customers.

That's it! By following these steps, you can quickly get a pulse on customer sentiment for any Amazon product without reading every single review.

## Technologies Used
This project utilizes a mix of web development and natural language processing technologies:
- **Python & Flask** – Backend server for handling requests, scraping Amazon pages, and running the sentiment analysis logic.
- **BeautifulSoup & Requests** – Used for web scraping the review content from Amazon product pages (parsing HTML and extracting review text).
- **Hugging Face Transformers (BERT)** – The backend uses a pre-trained *DistilBERT model fine-tuned on SST-2* for sentiment classification. BERT helps interpret the nuance in text and determine if a review is positive or negative based on context.
- **VADER Sentiment Analyzer** – A lexicon and rule-based sentiment analysis tool that quickly gauges sentiment. We use VADER to get an initial sentiment score for a review. If the sentiment is clearly positive or negative, we trust VADER; if it's ambiguous, we let BERT have a say. This combination improves accuracy by leveraging both simple rules and deep learning.
- **OpenAI GPT-3.5** – Used via the OpenAI API to generate the summary of reviews. The model takes the combined text of reviews and produces a concise summary highlighting the main points (positive, negative, neutral aspects). This provides a human-readable overview of the feedback.
- **React** – Front-end library for building the user interface. It creates the interactive web page where you input the URL and view results.
- **JavaScript (HTML/CSS)** – Powers the dynamic elements on the front-end and styling of the app interface.

By combining these technologies, the app delivers a seamless experience: from scraping raw HTML, to advanced NLP processing, all the way to an intuitive interface for end-users.

## Future Improvements
There are several enhancements and features that could make **Amazon Review Sentiment Analyzer** even more powerful and user-friendly:
- **Better Neutral Analysis**: Currently, reviews that aren’t clearly positive or negative are marked as neutral. We could improve this by expanding the classification model or introducing a middle-ground sentiment category with more nuance.
- **Pagination & More Reviews**: Right now, the scraper might fetch a fixed number of pages of reviews (e.g., 10 pages). In the future, we could add controls to let users choose how many reviews to analyze or automatically fetch all available reviews for more comprehensive analysis.
- **Enhanced UI/UX**: The interface could show example inputs, loading indicators during scraping/analysis, or even display a few sample positive and negative review quotes for transparency. A more polished design and responsiveness would make the tool more inviting.
- **Local Summarization Model**: To reduce reliance on the OpenAI API (which requires an API key and may incur costs), we could integrate an open-source summarization model. This would allow the summary feature to work out-of-the-box for anyone running the project.
- **Support for Other Websites or Data Sources**: While it's focused on Amazon reviews, the framework could be extended to other e-commerce sites or even other types of review datasets. Making the scraping and analysis more general-purpose would broaden the project’s applicability.
- **Deployment**: Eventually, deploying the app (e.g., on Heroku or AWS) would allow others to use it without needing to set up the environment. A containerized setup with Docker could also help in distributing and running the application consistently.

Each of these improvements would build on the current foundation, making the tool even more robust and useful for quickly understanding product feedback. Feel free to explore these ideas or contribute with your own if you find this project interesting!
