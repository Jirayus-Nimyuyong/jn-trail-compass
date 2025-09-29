AWS Budget Setup
AWS Budget Setup
In this lecture, we will set up a budget and an alarm for that budget to ensure we do not spend any money or exceed our intended spending for this course.

To begin, we need to access the billing console. You can do this by clicking on the top right of your screen and then selecting "Billing and Cost Management."

If you encounter an "Access Denied" message, this is likely because you are logged in as an IAM user. For example, I am logged in as an IAM user named Stephane from my accounts. Even though I have administrative access, I cannot access my billing data.

To fix this, you need to log in using your root account. In the root account, you will see the name of your account without the "IAM user" label. Click on the account name and navigate to "Accounts."

Scroll down until you find the section labeled "IAM user and role access to billing information." By default, this is deactivated. You need to activate IAM access to allow IAM users with administrative privileges to access billing information.

After activating IAM access, return to your billing console and refresh the page. It may take some time, but eventually, you will be able to see your billing data.

Except for the forecast section, which may show a "data unavailable" exception due to insufficient historical data, you will be able to view all your cost information.

Let me show you what a billing page looks like for an account with some costs. You will see information such as the month-to-date cost, the total forecasted cost for the current month, and last month's total cost.

From this page, you can obtain a cost breakdown by month, which becomes more informative as you start incurring costs.

You can also view detailed bills. For example, if you look at bills for December 2023, you will find charges by service at the bottom of the page. Currently, I have 28 active services.

For instance, looking at the Elastic Compute Cloud (EC2) service, I see a cost of 43 in the EU Ireland region. The breakdown includes Amazon Elastic Compute, NatGateway costing 35, EBS costs, Elastic IP costs, and others.

This detailed billing information allows you to understand how each service is being used and billed, enabling you to break down your bill effectively.

If you notice any unexpected costs, remember to check the bills section for the month you are interested in and scroll down to the charges by service section.

Next, you can access the free tier dashboard on the left-hand side. AWS offers a free tier, and this dashboard shows your current usage, forecasted usage, and the limits of the free tier.

If your forecasted usage exceeds the free tier limits, the usage indicator will turn red, indicating that you will be billed. It is important to turn off any resources that are running and potentially incurring charges.

This free tier dashboard is a very helpful tool for monitoring your AWS usage and avoiding unexpected charges.

Now, let's proceed to set up a budget. On the left-hand side, click on "Budgets." Here, you can create a budget that will alert you whenever you reach specified thresholds.

Click "Create a budget" and select the "Simplified" template. The first budget we will create is a zero spend budget, which will alert us as soon as we reach one cent of spending.

Name the budget "My Zero Spend Budget" and add your email address to receive alerts. For example, I use stephane@example.com. Then, create the budget.

Whenever your spending reaches one cent, you will receive an email alert. This is very helpful to monitor and control your costs.

You can also create a monthly cost budget using another template. For example, set a monthly cost budget of 10 dollars, indicating that you do not want to spend more than 10 dollars per month on this course.

Add your email recipients again, such as stephane@example.com. If you follow this course closely, you should not spend any money, but it is still good to set up a budget to avoid unexpected charges.

For this 10-dollar budget, you can configure alerts to be sent when your actual spend reaches 85% and 100%, as well as when your forecasted spend is expected to reach 100%.

This setup allows you to receive up to three email alerts based on your spending thresholds. After configuring, create the budget.

As you can see, my zero spend budget has already been exceeded because I have spent some money this month, so I am receiving an email alert immediately.

With these budgets, access to the free tier dashboard, and detailed bill breakdowns, you should be able to debug any costing or billing issues you encounter during this course.

This skill is essential when using AWS to manage and control your expenses effectively.

That concludes this lecture. I hope you found it helpful, and I will see you in the next lecture.

Key Takeaways
Access to billing data requires enabling IAM user and role access in the root account.
The AWS billing console provides detailed cost breakdowns by service and month.
The free tier dashboard helps monitor usage and forecast potential charges.
Setting up budgets with alerts helps prevent unexpected AWS costs.