Geo Restriction

• You can restrict who can access your distribution
• Allowlist: Allow your users to access your content only if they're in one of the
countries on a list of approved countries.
• Blocklist: Prevent your users from accessing your content if they're in one of the
countries on a list of banned countries.
• The “country” is determined using a 3rd party Geo-IP database
• Use case: Copyright Laws to control access to content
---
CloudFront - Geo Restriction
Introduction to CloudFront Geo Restriction
This lecture provides a brief overview of CloudFront Geo Restriction. It explains how you can restrict access to your CloudFront distribution based on the country from which users attempt to access it.

You can configure an allowlist to specify a list of approved countries or a blocklist to specify a list of banned countries. The country of the user is determined by using a third-party Geo-IP database that matches the user's IP address to the country it belongs to.

Use Case for Geo Restriction
A common use case for geo restriction is to comply with copyright laws by controlling access to content based on geographic location.

How to Enable Geographic Restrictions in CloudFront
To enable geographic restrictions, navigate to the Security section in the CloudFront console. Under this section, you will find the option for CloudFront geographic restrictions, specifically under "Countries."

Click on "Edit" to configure the restrictions. Although this option is somewhat hidden, here you can choose between setting up an allowlist or a blocklist.

For example, you can set up an allowlist by enumerating the countries that will always be allowed access. All other countries will be blocked by CloudFront.

In this example, India and the United States are allowed on the CloudFront distribution. Once you are satisfied with the configuration, save the changes.

After saving, the restriction type is set to allowlist, and the allowed countries are listed accordingly.

Conclusion
This concludes the overview of CloudFront Geo Restriction. This feature enables you to control access to your distribution based on geographic location effectively.

Key Takeaways
CloudFront Geo Restriction allows controlling access to your distribution based on the user's country.
You can configure either an allowlist of approved countries or a blocklist of banned countries.
The country is determined by matching the user's IP address using a third-party Geo-IP database.
Geo restrictions are useful for enforcing copyright laws and controlling content access geographically.