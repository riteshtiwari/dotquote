import braintree
import secrets

braintree.Configuration.configure(braintree.Environment.Sandbox,
                                  merchant_id=secrets.braintree_merchant_id,
                                  public_key=secrets.braintree_public_key,
                                  private_key=secrets.braintree_private_key)
