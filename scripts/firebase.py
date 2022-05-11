import os
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use a service account
cred = credentials.Certificate(os.getenv("SA_PATH"))
firebase_admin.initialize_app(cred)

db = firestore.client()

def to_unicode(s):
    return u"{}".format(s)