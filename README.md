



database schema




locations
id
name
postcode
prices (json)
rules (json)


tickets - list of current tickets and check ins for people with a yearly pass 
(a ticket can be FREE if the user has a yearly pass)
id
registration
email
created_at
expires_at
location


ticket_payments (multiple payments on a ticket if you extend time)
ticket_id
transaction_id


subscriptions - yearly pass etc -also stores a email address to do reminders + log in passcode
id
registration
email
firstname
lastname
created_at
expires_at



subscription_payments (multiple payments if we allow monthly payment or a renewal etc)
subscription_id
transaction_id


payments
created_at
transaction id
amount_in_cents
payment_status








### Flow

user enters rego
user selects location from dropdown
user selects price point (+ time frame)
-> create ticket with pending payment status - receive payment intent secret
user pays 
 - update ticket status
 - webhook also listenting for payment 
receive email with receipt
receive email + web notification with warning that parking will expire soon


STRETCH
user can extend ticket time with additional payment

