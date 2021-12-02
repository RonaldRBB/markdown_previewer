/**
 * *****************************************************************************
 * IMPORTS
 * *****************************************************************************
 */
import * as marked from "https://cdn.skypack.dev/marked@4.0.3";
/**
 * *****************************************************************************
 * CONSTANTS
 * *****************************************************************************
 */
const ADD = "ADD";
const START_MARKDOWN = `
 # A header (H1 size)
 ## A sub header (H2 size)
 
 A [link](https://codepen.io/RonaldRBB/full/GRvypKE)
 
 Inline code \`console.log("hello world")\` inline code
 
 \`\`\`
 // A code block
 function helloWorld() {
     return \'Hello World\';
 }
 \`\`\`
 
 A list item
 * item 1
     * item 2
         * item 3
 
 > A blockquote
 
 ![An image](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
 
 **And bolded text**`;
/**
 * *****************************************************************************
 * CONFIG
 * *****************************************************************************
 */
marked.setOptions({
    breaks: true,
    highlight: function (code) {
        return Prism.highlight(code, Prism.languages.javascript, "javascript");
    },
});
/**
 * *****************************************************************************
 * REDUX
 * *****************************************************************************
 */
const addMarkdown = (markdown) => {
    return {
        type: ADD,
        markdown: markdown,
    };
};
const markdownReducer = (state = "", action) => {
    switch (action.type) {
        case ADD:
            return action.markdown;
        default:
            return state;
    }
};
const store = Redux.createStore(markdownReducer);

/**
 * *****************************************************************************
 * REACT
 * *****************************************************************************
 */
/**
 * -----------------------------------------------------------------------------
 * Markdown Input
 * -----------------------------------------------------------------------------
 */
class MarkdownInput extends React.Component {
    /**
     * Constructor
     * -------------------------------------------------------------------------
     *
     */
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        this.props.updateMarkdown(START_MARKDOWN);
    }
    handleChange(event) {
        this.props.updateMarkdown(event.target.value);
    }
    render() {
        return (
            <div className="d-flex flex-column">
                <h5 className="text-center m-4">Markdown Editor</h5>
                <textarea
                    // className="form-control"
                    id="editor"
                    onChange={this.handleChange}
                    value={this.props.markdown}
                />
            </div>
        );
    }
}
/**
 * -----------------------------------------------------------------------------
 * Markdown Preview
 * -----------------------------------------------------------------------------
 */
class MarkdownPreview extends React.Component {
    render() {
        let markedPrewiew = marked.parse(this.props.markdown);
        return (
            <div className="d-flex flex-column">
                <h5 className="text-center m-4">Markdown Preview</h5>
                <div
                    id="preview"
                    dangerouslySetInnerHTML={{ __html: markedPrewiew }}
                ></div>
            </div>
        );
    }
}
/**
 * -----------------------------------------------------------------------------
 * Markdown Editor Container
 * -----------------------------------------------------------------------------
 */
class MarkdownEditor extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <MarkdownInput
                            markdown={this.props.markdown}
                            updateMarkdown={this.props.updateMarkdown}
                        />
                    </div>
                    <div className="col-md-6">
                        <MarkdownPreview markdown={this.props.markdown} />
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * *****************************************************************************
 * REACT REDUX
 * *****************************************************************************
 */
const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;
const mapStateToProps = (state) => ({ markdown: state });
const mapDispatchToProps = (dispatch) => ({
    updateMarkdown: (markdown) => {
        dispatch(addMarkdown(markdown));
    },
});

const Container = connect(mapStateToProps, mapDispatchToProps)(MarkdownEditor);
class AppWrapper extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Container />
            </Provider>
        );
    }
}
/**
 * *****************************************************************************
 * RENDER
 * *****************************************************************************
 */
ReactDOM.render(<AppWrapper />, document.getElementById("app"));
