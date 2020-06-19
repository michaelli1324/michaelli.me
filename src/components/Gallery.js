import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Gallery extends Component {
    constructor () {
        super();
    }
    renderGallery (images) {
        if (!images) return;

        const gallery = images.map((obj, i) => {
            return (
                <article className="4u 6u$(small) 12u$(xsmall) work-item" key={i}>
                    <a href={obj.link} target="_blank">
                        <div className="image" style={{
                            backgroundImage: `url(${obj.thumbnail})`,
                            backgroundColor: `${obj.background}`
                        }} />
                    </a>
                    <h3 className="title">{obj.caption}</h3>
                    <p className="role">{obj.role}</p>
                    <p className="description">{obj.description}</p>
                </article>
            );
        });

        return (
            <div className="row">
                {gallery}
            </div>
        );
    }
    render () {
        const { images } = this.props;

        return (
            <div>
                {this.renderGallery(images)}
            </div>
        );
    }
}

Gallery.displayName = 'Gallery';
Gallery.propTypes = {
    images: PropTypes.array
};

export default Gallery;