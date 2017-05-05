import React from "react";

export default class extends React.Component {
    render() {
        const footerStyles = {
            marginTop: "30px",
        };

        return (
            <footer style={footerStyles}>
                <div class="row">
                    <div class="col-lg-12">
                        <p>Copyright &copy; MadeByMe.com</p>
                    </div>
                </div>
            </footer>
        );
    }
}