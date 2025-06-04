# How to create releases

## Updating the questions data

All changes to question data have to be made on Google Sheets: that serves as the source of all data.
The sheet can be accessed [here](https://docs.google.com/spreadsheets/d/110mI5KwlDNswGaTHGJ931A034O5Svj7X657eFspsvfE/edit?usp=sharing):
if you don't have access, reach out to a PoliNetwork admin.

The data on the sheet is regularly pulled by a GitHub Actions workflow on the [PoliNetworkOrg/TheTOLProjectData](https://github.com/PoliNetworkOrg/TheTOLProjectData) repo. If you want to update it manually you can dispatch the update workflow from [here](https://github.com/PoliNetworkOrg/TheTOLProjectData/actions/workflows/update.yml).  
The updated data is available for inspection at the `/dbpreview` and `/qpreview` routes of the website.

Once you have verified that the question display correctly, you can push the changes to production by dispatching the [`deploy`](https://github.com/PoliNetworkOrg/TheTOLProjectData/actions/workflows/deploy.yml) workflow.

## Updating the website

You can make all the changes you want on the `main` branch of this repo: they will be automatically deployed on our preview environment.

When you're ready to release the changes, follow these steps:

1. **Bump the version using `npm version`**  
   You can choose to use `patch`, `minor`, or `major` depending on the changes you're releasing.

2. **Push the commit and the tags to the repo: `git push && git push --tags`**  
   If you get an error because there are tag conflicts, double check that your local branch is up-to-date; you can overwrite local tags with `git pull --tags -f`.

3. **[Create a new release](https://github.com/PoliNetworkOrg/TheTOLProject/releases/new) on GitHub**  
   Make sure you choose the tag you've just created as target. If you want to generate notes automatically (recommended) make sure to select the correct previous tag.  
   Publish the release: this will automatically trigger the production deployment.

4. **Update and deploy the db**  
   The new website will expect a db with the same version.  
   You'll first need update the data with the [`update`](https://github.com/PoliNetworkOrg/TheTOLProjectData/actions/workflows/update.yml) workflow. After that's done you'll see that the version in the json file matches the one of the website.  
   You can now run the [`deploy`](https://github.com/PoliNetworkOrg/TheTOLProjectData/actions/workflows/deploy.yml) workflow to push the changes to production.
