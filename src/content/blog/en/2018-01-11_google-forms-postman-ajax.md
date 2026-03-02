---
title: "How to Submit Google Forms via Postman and Ajax"
description: "Connect a static contact form to Google Forms via HTTP POST — no iframe needed. Step-by-step guide with Postman and jQuery Ajax."
pubDate: "2018-01-11"
heroImage: "/images/blog/posts/google-forms-postman-ajax/hero.png"
heroLayout: "banner"
tags: ["tech", "javascript", "web-development"]
---

When building basic static websites — like landing pages or personal sites — you often need to connect a contact form. If you're not using anything beyond HTML, CSS, and JavaScript (as is common with [GitHub Pages](https://pages.github.com/)), [Google Forms](https://www.google.com/forms/about/) is a solid option for storing visitor submissions.

Below is the process to connect your site's contact form to a Google Form without embedding it in an iframe, using a simple HTTP request.

## Submitting the Form via Postman

First, go to [Google Forms](https://www.google.com/forms/about/) and create a form like this:

<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdnW7ixrovoi7V7sJQihWouPztZL4GoRMAP5SpoVh2UfMhxOQ/viewform?embedded=true" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0" loading="lazy" title="Google Forms contact form">Loading…</iframe>

Next, open the [form](https://docs.google.com/forms/d/e/1FAIpQLSdnW7ixrovoi7V7sJQihWouPztZL4GoRMAP5SpoVh2UfMhxOQ/viewform) and inspect each field to find the `name` attributes of the inputs, which follow the format `entry.{id}`:

![Inspecting form field names in browser DevTools](/images/blog/posts/google-forms-postman-ajax/postman-1.webp)

> **Tip:** Another quick way to find all the field IDs is to inspect near the `<form>` tag, where you'll find `hidden` inputs whose `name` attributes start with `entry.`, containing all the form field identifiers:

![Hidden fields with entry IDs inside the form tag](/images/blog/posts/google-forms-postman-ajax/form-hidden-entries.png)

Once you have all the `name` values, you can submit the form by sending an HTTP request with [Postman](https://www.getpostman.com/):

1. Change the end of the form URL from `viewform` to `formResponse`:

```
https://docs.google.com/forms/d/e/1FAIpQLSdnW7ixrovoi7V7sJQihWouPztZL4GoRMAP5SpoVh2UfMhxOQ/viewform
https://docs.google.com/forms/d/e/1FAIpQLSdnW7ixrovoi7V7sJQihWouPztZL4GoRMAP5SpoVh2UfMhxOQ/formResponse
```

2. Use `text/xml` as the `Content-Type` in the Headers:

![Postman headers with Content-Type text/xml](/images/blog/posts/google-forms-postman-ajax/postman-2.webp)

3. Define the body content. For [this example form](https://docs.google.com/forms/d/e/1FAIpQLSdnW7ixrovoi7V7sJQihWouPztZL4GoRMAP5SpoVh2UfMhxOQ/viewform), the `name` values for name, email, phone, and message are `entry.568194084`, `entry.1303875942`, `entry.807958025`, and `entry.703388132` respectively:

![Postman body with form entry fields](/images/blog/posts/google-forms-postman-ajax/postman-3.png)

If you followed the steps above, you should be able to submit responses to the Google Form using Postman. Feel free to use [my example form](https://docs.google.com/forms/d/e/1FAIpQLSdnW7ixrovoi7V7sJQihWouPztZL4GoRMAP5SpoVh2UfMhxOQ/viewform) for testing; responses appear in this [spreadsheet](https://docs.google.com/spreadsheets/d/1r0O9A4oRT81jgzIodJRNL_1GA9WYgJsdRxWVjQULv00/edit#gid=1264787793).

## Submitting the Form via Ajax

Finally, it's time to connect your web form via Ajax. Here's a simple jQuery example:

```javascript
$.ajax({
  url: 'https://docs.google.com/forms/d/e/1FAIpQLSdnW7ixrovoi7V7sJQihWouPztZL4GoRMAP5SpoVh2UfMhxOQ/formResponse',
  type: 'POST',
  crossDomain: true,
  dataType: "xml",
  data: {
    'entry.568194084': 'Value name field',
    'entry.1303875942': 'Value email field',
    'entry.807958025': 'Value phone field',
    'entry.703388132': 'Value message field'
  },
  success: function(jqXHR, textStatus, errorThrown) {
    console.log('Enter on success');
  },
  error: function(jqXHR, textStatus, errorThrown) {
    console.log('Enter on error');
  }
});
```

As you can see, we only needed to translate the Postman request into jQuery Ajax format. Here's a minimal working example of a web form connected to the example form; all submissions will appear in the [response spreadsheet](https://docs.google.com/forms/) linked above:

<iframe src="https://docs.google.com/spreadsheets/d/14iddB2KpAgBb7pKbGPQwFfMCcjo2IWV_uFHMCq-0U_4/edit?usp=sharing&widget=true&headers=false" width="100%" height="400" frameborder="0" loading="lazy" title="Google Forms response spreadsheet">Loading…</iframe>

One final note: when using this approach, you may see an error like `No 'Access-Control-Allow-Origin' header is present on the requested resource`. In other applications this is usually fixed by allowing the origin domain on the server, but Google Forms doesn't expose such a setting. Despite that, the submission still succeeds, so you can safely ignore this message.

Thanks for reading. If you found this useful, feel free to share it.

**Resources:** [GitHub repository with the code](https://github.com/xergioalex/googleFormsHttpRequest)
