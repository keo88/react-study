const React = require("react");

function LikeButton() {
    const [liked, setLike] = React.useState(false);
    console.log('1')

    function onClickButton() {
        console.log('2')
        if (liked) {
            setLike(false);
        } else {
            setLike(true);
        }
    }

    console.log('3')
    let title = 'Like';

    if (liked) {
        title = 'You liked this.';
    } else {
        title = 'Like';
    }

    console.log('4')
    return (
        <button onClick={onClickButton}>
            {title}
        </button>
    );
}

module.exports = LikeButton;