from firebase import db
from firebase_admin import firestore
import csv

CARDS_COLLECTION = "cards"
DECKS_COLLECTION = "decks"
TAGS_COLLECTION = "tag-cards"

def save_card(card_details):
    """
    Given card_details as an object
    Save its details to the relevant collections in the database
    """
    print(f"Adding {card_details['name']}")
    # convert tags to list
    card_tags = card_details["tags"].split("+")

    # add card details to card collection
    new_card_ref = db.collection(CARDS_COLLECTION).document()
    new_card_ref.set({
        "link": card_details["link"],
        "name": card_details["name"],
        "src": card_details["src"],
        "tags": card_tags
    })

    # get id of new card
    card_id = new_card_ref.id

    # add to relevant tag collections
    for tag in card_tags:
        tag_ref = db.collection(TAGS_COLLECTION).document(tag)
        tag_doc = tag_ref.get()
        if tag_doc.exists:
            tag_ref.update({
                "cards": firestore.ArrayUnion([card_id])
            })
        else:
            tag_ref.set({
                "name": tag,
                "cards": [card_id]
            })


def csv_to_firebase(csv_path):
    with open(csv_path, "r", encoding="utf8") as f:
        reader = csv.DictReader(f, delimiter=",")
        i = 0
        for row in reader:
            if i == 0:
                i += 1
                continue
            save_card(row)
            i += 1

if __name__ == "__main__":
    csv_to_firebase("./data/ai.csv")
