import requests, json
from getpass import getpass

endpoint_list = "http://localhost:8000/api/"
endpoint_auth= "http://localhost:8000/api/token/"
endpoint_prompt= "http://localhost:8000/api/createplant/"

username = 'oguntoye@iastate.edu' #input("Username: ")
password = 'Mo444mo4o'  #getpass("Password: ")

# get = requests.post(endpoint)

get = requests.post(endpoint_auth, json={"email": username,
                                        "password": password})

# data = {
#     "query": "using the way i wrote past emails, write an email to Dr Kyle asking for a letter of recommendation. What should I",
# }


data = {
    "plantName": "Habanero",
    "datePlanted": "2022-06-01",
    "farmer": 3
    }
# post_doc = {
#     "text": "I need habanero, so i have to go and get it."
# }

# print(get.json())
if get.status_code == 200:
    # token = get.json()['access']
    # token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzExMTM2NDYzLCJpYXQiOjE3MTExMzI4NjMsImp0aSI6IjU0OWI4MGQwZDg1MTQ5ZTliZWI3NGY2NWZmZGI0ZGM0IiwidXNlcl9pZCI6MiwiZW1haWwiOiJvZ3VudG95ZWtAZ21haWwuY29tIiwiZmlyc3RfbmFtZSI6Ikt1bmxlIiwibGFzdF9uYW1lIjoiT2d1bnRveWUiLCJmYXJtTmFtZSI6IkN5Y2xvbmVGYXJtIiwiZmFybUxvY2F0aW9uIjoiMjQxNiBCbGFua2VuYnVyZyBEciBVbml0IEEgQW1lcyBJb3dhIDUwMDEwIiwiZmFybVNpemUiOjIzNDQuMH0.OZmuMtql9f3vdPYKzrUcjTrJmQka9b-UEwZ5x2QbITs'
    # token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzExMTQ1NTMwLCJpYXQiOjE3MTExNDE5MzAsImp0aSI6IjkzNzkxZDUxNzYwNjQ3N2U5N2MyZWFlNGUwMGI3Y2Q0IiwidXNlcl9pZCI6MywiZW1haWwiOiJrdW5sZXRveWVAZ21haWwuY29tIiwiZmlyc3RfbmFtZSI6IlRveWUiLCJsYXN0X25hbWUiOiJLdW5sZSIsImZhcm1OYW1lIjoiYXlvLUlzZSIsImZhcm1Mb2NhdGlvbiI6IjI0MTYgQmxhbmtlbmJ1cmcgRHIgVW5pdCBBIEFtZXMgSW93YSA1MDAxMCIsImZhcm1TaXplIjoyNDIzNC4wfQ.LVrCs7DAXuWDBShuTWGnEPezgwBSL8kmOoITRB1xE8A'
    # token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzExMTQ1OTIyLCJpYXQiOjE3MTExNDIzMjIsImp0aSI6IjQ1ZjIxOThjYzZjZTRkYmI5MmJmOTM2ZWYzN2RkOTdiIiwidXNlcl9pZCI6MywiZW1haWwiOiJrdW5sZXRveWVAZ21haWwuY29tIiwiZmlyc3RfbmFtZSI6IlRveWUiLCJsYXN0X25hbWUiOiJLdW5sZSIsImZhcm1OYW1lIjoiYXlvLUlzZSIsImZhcm1Mb2NhdGlvbiI6IjI0MTYgQmxhbmtlbmJ1cmcgRHIgVW5pdCBBIEFtZXMgSW93YSA1MDAxMCIsImZhcm1TaXplIjoyNDIzNC4wfQ.pRMsEhHtQkDVWFl5eTCAYiEys6JUmWMHI8DlDV9iEdw'
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzExMTQ3MTU4LCJpYXQiOjE3MTExNDM1NTgsImp0aSI6IjE1OWE1MGU2ODdhZTRlODJiYTEzM2FiMzY4M2I4ZDI5IiwidXNlcl9pZCI6MSwiZW1haWwiOiJvZ3VudG95ZUBpYXN0YXRlLmVkdSIsImZpcnN0X25hbWUiOm51bGwsImxhc3RfbmFtZSI6bnVsbCwiZmFybU5hbWUiOm51bGwsImZhcm1Mb2NhdGlvbiI6bnVsbCwiZmFybVNpemUiOm51bGx9.a2umuMOpKujK7RPJxN5c6YDNGrvq0bpG_MCnkDw2VhE'
    # token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzExMTQ1OTIyLCJpYXQiOjE3MTExNDIzMjIsImp0aSI6IjQ1ZjIxOThjYzZjZTRkYmI5MmJmOTM2ZWYzN2RkOTdiIiwidXNlcl9pZCI6MywiZW1haWwiOiJrdW5sZXRveWVAZ21haWwuY29tIiwiZmlyc3RfbmFtZSI6IlRveWUiLCJsYXN0X25hbWUiOiJLdW5sZSIsImZhcm1OYW1lIjoiYXlvLUlzZSIsImZhcm1Mb2NhdGlvbiI6IjI0MTYgQmxhbmtlbmJ1cmcgRHIgVW5pdCBBIEFtZXMgSW93YSA1MDAxMCIsImZhcm1TaXplIjoyNDIzNC4wfQ.pRMsEhHtQkDVWFl5eTCAYiEys6JUmWMHI8DlDV9iEdw'
    get = requests.post(endpoint_prompt,
                       headers={"Authorization": f"Bearer {token}"},
                        data=data)
    print(get.json())
else:
    print("Authentication failed")


# if get.status_code == 200:
#     token = get.json()['access']

#     #POST data to the user's database
#     get = requests.post(endpoint_list,
#                        headers={"Authorization": f"Bearer {token}",
#                                 "Content-Type": "application/json"},
#                        json=data)

#     #GET all data connected to the user
#     # get = requests.get(endpoint_list,
#     #                 headers={"Authorization": f"Bearer {token}"})

#     print(get.json())
# else:
#     print("Authentication failed")