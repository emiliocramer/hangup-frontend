import React from 'react';

const TwilioTutorialComponent = () => {
    return (
        <div className="max-w-md bg-gray-800 mx-auto rounded-lg shadow-lg p-6 mt-10">
            <h2 className="text-xl font-bold mb-4 text-center text-white">How to Get Your Twilio SID and Auth Token</h2>
            <ol className="list-decimal list-inside text-gray-300 space-y-2">
                <li>
                    Sign up or log in to your <a href="https://www.twilio.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500">Twilio account</a>.
                </li>
                <li>
                    Navigate to the <strong>Dashboard</strong> of the Twilio Console.
                </li>
                <li>
                    Find the <strong>Project Info</strong> section where your Account SID is displayed.
                </li>
                <li>
                    To reveal your Auth Token, click on the <strong>Show</strong> button next to your hidden Auth Token. Make sure to keep this information secure.
                </li>
                <li>
                    Copy both the <strong>Account SID</strong> and <strong>Auth Token</strong> and use them in the form above.
                </li>
            </ol>
            <div className="mt-4 text-center">
                <a href="https://www.twilio.com/console" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-500 text-white rounded-md hover:bg-blue-600 px-4 py-2">Go to Twilio Console</a>
            </div>
        </div>
    );
};

export default TwilioTutorialComponent;
