

const Link = (props: any) => {
  return (
    <>
      <a href={props.hrefLink}
        className={props.classLink} >
        {props.textLink}
      </a>
    </>
  );
}

export default Link;

// className="link-success link-offset-2 link-underline-opacity-0 link-underline-opacity-0 -hover">