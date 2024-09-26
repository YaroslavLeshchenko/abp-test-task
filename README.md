The project is deployed on Vercel for a live demo. You can check it out here:[(https://abp-test-task-j0d43l7lp-yaroslavleshchenkos-projects.vercel.app)]


VIN Decoder Application:
This is a simple VIN (Vehicle Identification Number) decoder application built with Vite and React. It allows users to input a VIN code, decode it using the NHTSA API, and display the results in a clean and user-friendly interface. Additionally, the application saves the last three VIN codes to local storage for easy access.

Features:
VIN Validation: Ensures the VIN code is valid with proper length (17 characters) and allowed characters.

VIN Decoding: Uses the NHTSA API to decode VIN codes and display information in a list format.

Local Storage History: Stores the last three VIN codes locally, allowing users to quickly reselect previous VINs.

Clear Input: Allows users to easily clear the current VIN and results.

Scroll to Top: Adds a scroll functionality to quickly return to the top of the page.

Responsive Design: Built with SCSS for a modern and responsive user experience.


Tech Stack:
Vite: Lightning-fast build tool and development environment for modern web projects.

React: JavaScript library for building user interfaces.

SCSS: CSS preprocessor used for organizing styles and adding nesting functionality.


How to Use:
Enter a 17-character VIN code in the input field.

Click the "Submit" button to decode the VIN.

The decoded information will be displayed below the input field.

The last three VIN codes entered will appear in the "Last VIN codes" section. You can click on any VIN to re-enter it into the input field.

Use the "Clear" button to reset the input and results.

Scroll to the top of the page by clicking the "Scroll to top" button.


Getting Started:
To run the project locally:

Clone the repository.

Run npm install to install dependencies.

Run npm run dev to start the development server.

Open http://localhost:5173/ to view it in the browser.