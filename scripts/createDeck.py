"""
Given target tags, creates a 24 card deck
"""

from firebase import db
import random

TARGET_TAGS = ["private"]
DECK_CODE = "SGB1"
DECK_NAME = "not csesoc"
DECK_SIZE = 24

def get_cards():
    card_ids = []
    for tag in TARGET_TAGS:
        tag_ref = db.collection("tag-cards").document(tag)
        tag_info = tag_ref.get()
        card_ids += tag_info.to_dict()["cards"]

    return card_ids

def create_deck(card_ids):
    num_cards = len(card_ids)
    if num_cards < DECK_SIZE:
        print(f"Warning: only {num_cards} cards")
        deck = card_ids
    else:
        deck = random.sample(card_ids, DECK_SIZE)

    deck_ref = db.collection("decks").document(DECK_CODE)
    deck_ref.set({
        "cards": deck,
        "name": DECK_NAME
    })

if __name__ == "__main__":
    cards = get_cards()
    create_deck(cards)