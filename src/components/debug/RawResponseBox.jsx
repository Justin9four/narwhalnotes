const RawResponseBox = ({response}) =>
  response ? (
    <div className="RawResponseBox">{JSON.stringify(response)}</div>
  ) : null;

export default RawResponseBox;
