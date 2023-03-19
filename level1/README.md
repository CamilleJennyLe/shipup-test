# Intro

We're trying to model the expected delivery date for online orders shipped through various shipping carriers.

# Level 1

Each shipping carrier has specific delivery promises (in days).
The online retailers assigns a shipping date and a carrier to each order.

We first want to compute a list of expected delivery dates for some packages.

# Comments
The dates I calculated were all one day off at first.
I added a +1, maybe the business implication behind is that the delivery promise starts the day after the shipping date?