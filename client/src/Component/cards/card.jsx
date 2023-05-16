
import './card.css'

const RoomCard = () => {
    return (
        <div>
            <article className="card">
                <div className="temporary_text">
                    <img src="https://cdn-static.roomster.com/pics/Original/L-27829600-0a820393b8e244eb9328db2dd6f2d586.jpg?optimize=high" alt='/' />
                </div>
                <div className="card_content">
                    <span className="card_title">This is a Title</span>
                    <span className="card_subtitle">Thsi is a subtitle of this page. Let us see how it looks on the Web.</span>
                    <p className="card_description">Lorem ipsum dolor, sit amet  expedita exercitationem recusandae aut dolor tempora aperiam itaque possimus at, cupiditate earum, quae repudiandae aspernatur? Labore minus soluta consequatur placeat.</p>

                </div>
            </article>
        </div>
    )
}

export default RoomCard
