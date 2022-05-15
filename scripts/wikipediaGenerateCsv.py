"""
Given list of names, scrape link and image from wikipedia
and write to csv
"""
import wikipedia
import csv
import requests
import json

NAME_FILE = "./data/celebs-13-may-22.txt"
OUT_CSV = "./data/celebs-13-may-22.csv"
HEADER = ["name", "src", "link", "tags"]
TAGS = "celebrities"

def fetch_wiki_main_image(title):
    url = 'https://en.wikipedia.org/w/api.php'
    data = {
        'action' :'query',
        'format' : 'json',
        'formatversion' : 2,
        'prop' : 'pageimages|pageterms',
        'piprop' : 'original',
        'titles' : title
    }
    response = requests.get(url, data)
    json_data = json.loads(response.text)
    return json_data['query']['pages'][0]['original']['source'] if len(json_data['query']['pages']) >0 else ''

def fetch_wiki_data(name):
    page = None
    try:
        titles = wikipedia.search(name)
        page = wikipedia.page(titles[0], auto_suggest=False)
    except wikipedia.exceptions.PageError as e:
        print(f"{name} does not exist")
        return None
    except wikipedia.exceptions.DisambiguationError as e:
        print(f"{name} is a disambiguation")
        print(e.options)
        return None

    try:
        src = fetch_wiki_main_image(page.title)
    except:
        src = ""

    name_data = {
        "name": name,
        "src": src,
        "link": page.url,
        "tags": TAGS
    }
    print(f"found {name}")
    return name_data

def generate_csv():
    with open(NAME_FILE, "r") as f:
        names = [line.strip() for line in f.readlines()]

    to_write = []
    for name in names:
        name_data = fetch_wiki_data(name)
        if name_data:
            to_write.append(name_data)

    with open(OUT_CSV, "w", encoding="utf8") as f:
        writer = csv.DictWriter(f, fieldnames=HEADER)
        writer.writeheader()
        writer.writerows(to_write)

if __name__ == "__main__":
    generate_csv()
