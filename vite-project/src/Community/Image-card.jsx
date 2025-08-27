import './Image-card.css';

function ImageCard({ image, description }) {
    return (
        <div className="image-card">
            <img src={image}
                alt={description}
                style={{ width: '100%' }}
                />
            <p>{description}</p>
        </div>
    );
}

export default ImageCard;