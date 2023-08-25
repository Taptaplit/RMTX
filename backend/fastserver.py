from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
from googleapiclient import discovery

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def check_toxicity_api(sentence):
  API_KEY = 'AIzaSyBNZPu0HgjQyP_fBa7dMaCuv8eJjAE8QJQ'

  client = discovery.build(
    "commentanalyzer",
    "v1alpha1",
    developerKey=API_KEY,
    discoveryServiceUrl="https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1",
    static_discovery=False,
  )

  analyze_request = {
    'comment': { 'text': sentence },
    'requestedAttributes': {'TOXICITY': {}}
  }

  response = client.comments().analyze(body=analyze_request).execute()
  
  if (response["attributeScores"]["TOXICITY"]["summaryScore"]["value"] > 0.55):
    return True
  else:
    return False
  
@app.post('/removeToxic')
def check_for_toxicity():
    print("here")
    try:
        sentence = request.json['sentence_for_analysis']
        toxic_status = check_toxicity_api(sentence)
        if toxic_status:
          response_json = {'info': "Success", 'toxic': True}
          return response_json
        else:
          response_json = {'info': "Success", 'toxic': False}
          return response_json
    except Exception as e:
        response_json = {'info': e, 'error': True}
        return response_json