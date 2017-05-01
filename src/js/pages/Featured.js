import React from "react";

import Article from "../components/featured/Article";

export default class extends React.Component {
    render() {
        const Articles = [
            "Some Article",
            "Some Other Article",
            "Yet Another Article",
            "Still More!"
        ].map((title, index) => <Article key={index} title={title} />);

        const adText = [
            "Ad Spot #1",
            "Ad Spot #2",
            "Ad Spot #3",
            "Ad Spot #4",
            "Ad Spot #5",
        ];

        const randomIndex = Math.random() * (adText.length - 1);
        const randomAd = adText[Math.round(randomIndex)];

        return (
            <div>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="well text-center">
                            {randomAd}
                        </div>
                    </div>
                </div>
                <div class="row">
                    {Articles}
                </div>
            </div>
        );
    }
}