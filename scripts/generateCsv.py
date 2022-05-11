import os
import base64 as b64
import csv

IMG_DIR = "./data/ai"
OUT_CSV = "./data/ai.csv"
HEADER = ["name", "src", "link", "tags"]
TAG="ai-generated"
IMG_FILETYPES = set(["jpg", "jpeg", "png"])
IMG_DOMAIN = "https://angeni.me/who-guessed-images-1/ai"

def encode_img(imgpath):
    """
    Given string for the path to an image
    Returns its base 64 encoding
    """
    with open(imgpath, "rb") as f:
        return b64.b64encode(f.read()).decode("utf-8")

def write_to_csv():
    toWrite = []

    files = os.listdir(IMG_DIR)
    for fname in files:
        name, ext = fname.split(".")
        if ext not in IMG_FILETYPES:
            continue
        img = f"{IMG_DOMAIN}/{fname}"

        new_row = {
            "name": name,
            "src": img,
            "link": "",
            "tags": TAG
        }
        toWrite.append(new_row)
    
    # write to csv
    with open(OUT_CSV, "w", encoding="utf8") as f:
        writer = csv.DictWriter(f, fieldnames=HEADER)
        writer.writeheader()
        writer.writerows(toWrite)

if __name__ == "__main__":
    write_to_csv()
