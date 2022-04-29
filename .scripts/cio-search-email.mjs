// .kenv/kenvs/egghead/scripts/cio-search-email.ts
import "@johnlindquist/kit";
var email = await arg("Enter CIO email: ");
var urlSafeEmail = encodeURIComponent(email);
var cioEmail = `https://fly.customer.io/env/97673/people?email=${urlSafeEmail}`;
open(cioEmail);
