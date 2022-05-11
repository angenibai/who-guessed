from firebase import db

AI_TAG = "ai-generated"
DECK_SIZE = 24

def get_ai_cards():
    ai_ref = db.collection("tag-cards").document(AI_TAG)
    tag_info = ai_ref.get()

    return tag_info.to_dict()["cards"]

def create_deck(card_ids):
    deck = card_ids[:DECK_SIZE]
    code = "AIAI"

    deck_ref = db.collection("decks").document(code)
    deck_ref.set({
        "cards": deck,
        "name": "Beautiful AI faces"
    })

if __name__ == "__main__":
    cards = get_ai_cards()
    create_deck(cards)