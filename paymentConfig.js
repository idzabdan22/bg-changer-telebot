const param = {
    "transaction_details": {
      "order_id": "001",
      "gross_amount": 190000,
      "payment_link_id": "for-payment-123"
    },
    "credit_card": {
      "secure": true
    },
    "usage_limit":  1,
    "expiry": {
      "start_time": "2022-04-01 18:00 +0700",
      "duration": 30,
      "unit": "minute"
    },
    "enabled_payments": [
      "credit_card",
      "bca_va",
      "indomaret"
    ],
    "item_details": [
      {
        "name": "10 Credit",
        "price": 2000,
        "quantity": 1,
        "merchant_name": "Your BG Changer"
      }
    ],
    "customer_details": {
      "first_name": "John",
      "last_name": "Doe",
      "email": "john.doe@midtrans.com",
      "phone": "+62181000000000",
      "notes": "Thank you for your purchase. Please follow the instructions to pay."
    },
  "custom_field1": "custom field 1 content", 
  "custom_field2": "custom field 2 content", 
  "custom_field3": "custom field 3 content"
  }