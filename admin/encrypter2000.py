from cryptography.fernet import Fernet
import os

key = Fernet.generate_key()
print("Key:", key)
cipher = Fernet(key)

with open(os.path.join(os.path.dirname(__file__), "credential.enc"), "rb+") as f:
  enc = cipher.encrypt(f.read())
  f.seek(0)
  f.truncate()
  f.write(enc)