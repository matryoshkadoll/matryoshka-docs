/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(`${process.cwd()}/siteConfig.js`);

function imgUrl(img) {
    return `${siteConfig.baseUrl}img/${img}`;
}

function docUrl(doc, language) {
    return `${siteConfig.baseUrl}docs/${language ? `${language}/` : ""}${doc}`;
}

function pageUrl(page, language) {
    return siteConfig.baseUrl + (language ? `${language}/` : "") + page;
}

class Button extends React.Component {
    render() {
        return (
            <div className="pluginWrapper buttonWrapper">
                <a
                    className="button"
                    href={this.props.href}
                    target={this.props.target}
                >
                    {this.props.children}
                </a>
            </div>
        );
    }
}

Button.defaultProps = {
    target: "_self"
};

const SplashContainer = props => (
    <div className="homeContainer">
        <div className="homeSplashFade">
            <div className="wrapper homeWrapper">{props.children}</div>
        </div>
    </div>
);

const Logo = props => (
    <div className="projectLogo">
        <img src={props.img_src} alt="Project Logo" />
    </div>
);

const ProjectTitle = () => (
    <h2 className="projectTitle">
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
    </h2>
);

const PromoSection = props => (
    <div className="section promoSection">
        <div className="promoRow">
            <div className="pluginRowBlock">{props.children}</div>
        </div>
    </div>
);

class HomeSplash extends React.Component {
    render() {
        const language = this.props.language || "";
        return (
            <SplashContainer>
                <div className="inner">
                    <ProjectTitle />
                    <PromoSection>
                        <Button href={docUrl("welcome", language)}>
                            Welcome
                        </Button>
                        <Button href={siteConfig.orgUrl}>GitHub</Button>
                    </PromoSection>
                </div>
            </SplashContainer>
        );
    }
}

const Block = props => (
    <Container
        padding={["bottom", "top"]}
        id={props.id}
        background={props.background}
    >
        <GridBlock
            align={props.align || "center"}
            contents={props.children}
            layout={props.layout}
        />
    </Container>
);

const Features = () => (
    <Block layout="fourColumn">
        {[
            {
                content: "This is the content of my feature",
                image: imgUrl("Icon.svg"),
                imageAlign: "top",
                title: "Feature One"
            },
            {
                content: "The content of my second feature",
                image: imgUrl("Icon.svg"),
                imageAlign: "top",
                title: "Feature Two"
            }
        ]}
    </Block>
);

const FeatureCallout = () => (
    <div
        className="productShowcaseSection paddingBottom"
        style={{ textAlign: "center" }}
    >
        <h2>Feature Callout</h2>
        <MarkdownBlock>These are features of this project</MarkdownBlock>
    </div>
);

const LearnHow = () => (
    <Block background="light">
        {[
            {
                content: "Talk about learning how to use this",
                image: imgUrl("Icon.svg"),
                imageAlign: "right",
                title: "Learn How"
            }
        ]}
    </Block>
);

const TryOut = () => (
    <Block id="try">
        {[
            {
                content: "Talk about trying this out",
                image: imgUrl("Icon.svg"),
                imageAlign: "left",
                title: "Try it Out"
            }
        ]}
    </Block>
);

const Description = props => (
    <Block background="dark" align="left">
        {[
            {
                image: imgUrl("Icon.svg"),
                imageAlign: "right",
                title: "Welcome!",
                content:
                    "Welcome to the documentation site for the Matryoshka project! Please see our [Welcome](" +
                    docUrl("welcome", props.language) +
                    ") page to learn more about the project. Among other things, you will find:\n" +
                    " * An introduction to how the project is laid out and how to navigate the documentation.\n" +
                    " * In-depth information about the server, client, and even this documentation site.\n" +
                    " * The server REST API reference.\n" +
                    " * ... and maybe even more!"
            }
        ]}
    </Block>
);

const Showcase = props => {
    if ((siteConfig.users || []).length === 0) {
        return null;
    }

    const showcase = siteConfig.users
        .filter(user => user.pinned)
        .map(user => (
            <a href={user.infoLink} key={user.infoLink}>
                <img src={user.image} alt={user.caption} title={user.caption} />
            </a>
        ));

    return (
        <div className="productShowcaseSection paddingBottom">
            <h2>Who is Using This?</h2>
            <p>This project is used by all these people</p>
            <div className="logos">{showcase}</div>
            <div className="more-users">
                <a
                    className="button"
                    href={pageUrl("users.html", props.language)}
                >
                    More {siteConfig.title} Users
                </a>
            </div>
        </div>
    );
};

class Index extends React.Component {
    render() {
        const language = this.props.language || "";

        return (
            <div>
                <HomeSplash language={language} />
                <h2 style={{ textAlign: "center" }}>IMPORTANT NOTE</h2>
                <h3 style={{ textAlign: "center", color: "FireBrick" }}>
                    This project is still very early into development and highly
                    unstable!
                </h3>
                <div className="mainContainer">
                    {/* <Features />
                    <FeatureCallout />
                    <LearnHow />
                    <TryOut /> */}
                    <Description language={language} />
                    {/* <Showcase language={language} /> */}
                </div>
            </div>
        );
    }
}

module.exports = Index;