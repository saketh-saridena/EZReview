# -*- coding: utf-8 -*-
"""Trial-2.3.BERT+VADER_Model.ipynb

Automatically generated by Colab.

Original file is located at
    https://colab.research.google.com/drive/16vMhXqb2BfF4VmYCJ4EWT5Y36GpGizin

#### **Installing and Importing necessary libraries**
"""

!pip install Flask
!pip install textblob
!pip install openai==0.28
!pip install vaderSentiment

import re
import requests
from bs4 import BeautifulSoup
from ast import literal_eval
from textblob import TextBlob
import openai
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from transformers import pipeline

"""#### **Function to find ASIN (Amazon Standard Identification Number)**"""

def get_asin_from_url(url):
    """ Extracts ASIN from the provided Amazon product URL. """
    match = re.search(r'/dp/([A-Z0-9]{10})', url)
    return match.group(1) if match else None

"""#### **Fetching the reviews of the product using ASIN extracted from the given URL**"""

def fetch_reviews(url, pages=10):
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Safari/605.1.15"
    }

    asin = get_asin_from_url(url)
    if not asin:
        print("Invalid URL or ASIN not found.")
        return []

    ajax_url = "https://www.amazon.com/hz/reviews-render/ajax/reviews/get/ref=cm_cr_arp_d_paging_btm_next_2"
    payload = {
        "sortBy": "",
        "reviewerType": "all_reviews",
        "formatType": "",
        "mediaType": "",
        "filterByStar": "",
        "filterByAge": "",
        "pageNumber": "1",
        "filterByLanguage": "",
        "filterByKeyword": "",
        "shouldAppend": "undefined",
        "deviceType": "desktop",
        "canShowIntHeader": "undefined",
        "reftag": "cm_cr_arp_d_paging_btm_next_2",
        "pageSize": "10",
        "asin": asin,
        "scope": "reviewsAjax0",
    }

    all_reviews = []

    for page in range(1, pages + 1):
        payload["pageNumber"] = str(page)
        response = requests.post(ajax_url, data=payload, headers=headers).text
        formatted_response = "\n".join(map(literal_eval, re.findall(r'"<div id=.*?</div>"', response)))
        soup = BeautifulSoup(formatted_response, "html.parser")

        for review in soup.select('[data-hook="review"]'):
            review_text = review.select_one('[data-hook="review-body"]').text.strip()
            all_reviews.append(review_text)

    return all_reviews

"""#### **Function to analyze the sentiment in the reviews using VADER+BERT Model**"""

def analyze_reviews_with_hybrid_model(reviews):
    # Initialize VADER
    vader_analyzer = SentimentIntensityAnalyzer()
    # Initialize BERT sentiment classifier
    bert_classifier = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")

    positive = negative = neutral = 0

    for review in reviews:
        # First pass with VADER
        vader_score = vader_analyzer.polarity_scores(review)

        # Determine if further analysis with BERT is needed
        if vader_score['compound'] > 0.1:
            sentiment = 'POSITIVE'
        elif vader_score['compound'] < -0.1:
            sentiment = 'NEGATIVE'
        else:
            # BERT for ambiguous cases
            bert_result = bert_classifier(review)[0]
            sentiment = bert_result['label']

        if sentiment == 'POSITIVE':
            positive += 1
        elif sentiment == 'NEGATIVE':
            negative += 1
        else:
            neutral += 1

    total_reviews = len(reviews)
    percentages = {
        "Positive Percentage": (positive / total_reviews) * 100 if total_reviews > 0 else 0,
        "Negative Percentage": (negative / total_reviews) * 100 if total_reviews > 0 else 0,
        "Neutral Percentage": (neutral / total_reviews) * 100 if total_reviews > 0 else 0
    }
    return percentages

"""#### **Integrating it with the OpenAI API**"""

openai.api_key = 'API_KEY'

def generate_summary(reviews):
    text = ' '.join(reviews)
    max_length = 4000  # OpenAI API token limit for input
    if len(text) > max_length:
        text = text[:max_length]  # Truncate to maximum allowed length

    response = openai.Completion.create(
        engine="gpt-3.5-turbo-instruct",
        prompt="Please create a concise summary of the reviews below. In four sentences, capture the key insights, highlighting the most significant positive, negative, and neutral aspects of the product. Ensure the summary is accurate and reflects the overall sentiment of the reviews. Focus on the main points that would be most helpful for someone considering this product:\n" + text,
        max_tokens=150
    )

    return response.choices[0].text.strip()

"""#### **Testing**"""

user_url = input("Enter the Amazon product URL: ")
reviews = fetch_reviews(user_url)
analysis_results = analyze_reviews_with_hybrid_model(reviews)
summary = generate_summary(reviews)

# Printing the analysis results one by one
for key, value in analysis_results.items():
    print(f"{key}: {value:.2f}%")

print("\nSummary:\n", summary)
