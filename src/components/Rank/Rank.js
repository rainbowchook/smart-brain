import React from 'react'

const Rank = ({ name, entries }) => {
  return (
    <div>
        <div className="white f3">
            {`Hello ${name} with ${entries} entries, your current rank is...`}
        </div>
        <div className="white f1">
            {/* {'#5'} */}
            {`#${entries} for now`}
        </div>
    </div>
  )
}

export default Rank