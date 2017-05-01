import React from "react";

export default class extends React.Component {
    render() {
        const { title } = this.props;
        return (
            <div class="col-md-4">
                <h2>{title}</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate, eros auctor dignissim scelerisque, lorem dolor volutpat ligula, nec suscipit nunc enim ac turpis. Sed vestibulum sed erat interdum mollis. Donec bibendum ipsum libero, nec tincidunt nibh ullamcorper quis. Nullam in justo a lectus feugiat fermentum. Quisque quis nibh euismod, commodo felis nec, mattis sapien. Ut arcu turpis, elementum sed bibendum eu, consequat vel tortor. Donec ligula ligula, eleifend non sapien cursus, scelerisque mollis orci. Vestibulum dapibus euismod metus in consectetur. Morbi vulputate lacus augue, sit amet maximus nisl accumsan vel. Cras maximus sapien at lectus cursus maximus.</p>
                <a class="btn btn-default">More Info</a>
            </div>
        );
    }
}