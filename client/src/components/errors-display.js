export default function ErrorsDisplay (props) {
    let errorsDisplay = null;
    const {errors} = props;
    
    if (errors.length) {
      errorsDisplay = (
        <div>
          <div className="validation-errors">
            <ul>
              {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>
          </div>
        </div>
      );
    }
  
    return errorsDisplay;
}