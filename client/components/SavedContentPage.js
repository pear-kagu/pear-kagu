import React from 'react'

const interests = ['Javascript', 'Python', 'CSS', 'HTML']

class SavedContentPage extends React.Component {
  render() {
    return (
      <div>
        <p>Here is a list of all of your interests:</p>
        <table className="saved-content-table">
          <tr className="saved-content-table">
            {interests.map(interest => {
              return (
                <td id="saved-content-table" key={interest}>
                  {interest}
                </td>
              )
            })}
          </tr>
        </table>
      </div>
    )
  }
}

export default SavedContentPage
