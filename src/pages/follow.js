import React from "react";
import { graphql, StaticQuery } from "gatsby";
import theme from "../theme/theme.yaml";
import Article from "../components/Article";
import Headline from "../components/Article/Headline";
import Seo from "../components/Seo";
import { FaTag , FaRss , FaPaperPlane } from "react-icons/fa";
import config from "../../content/meta/config";

const FollowPage = props => {

  return (
    <StaticQuery
      query={graphql`
        query EmailQuery {
          site {
            siteMetadata {
              emailSubLink
            }
          }
        }
      `}
      render={ queryResults => {
        const emailSubLink = queryResults.site.siteMetadata.emailSubLink
        return (
          <React.Fragment>
            <Article theme={theme}>
              <header>
                <Headline title="Cennik" theme={theme} />
              </header>
              <p>Koszt konsulatacji logopedycznych 120 zł/60 minut.<br></br>
              Koszt konsulatacji neurlogopedycznych 150 zł/60 minut.<br></br>
              Pakiet dziesięciu wizyt 60 minutowych 900 zł.<br></br>
              W przypadku pytań proszę o kontakt.
              </p>

              <a href="../rss.xml" target="_blank">
                <section className="subContainer">
                    <span className="subIcon"><FaRss/></span>
                    <span className="subText">RSS</span>
                </section>
              </a>

              <a href={emailSubLink} target="_blank">
                <section className="subContainer">
                  <span className="subIcon"><FaPaperPlane/></span>
                  <span className="subText">Email</span>
                </section>
              </a>

              <style jsx>{`
                p {
                  font-size: ${theme.font.size.s};
                  line-height: ${theme.font.lineHeight.xxl};
                  margin: 0 0 1.5em;
                  margin-bottom: 40px;
                }

                .subContainer {
                  display: inline-block;
                  border-radius: 6px;
                  padding: 10px;
                  padding-bottom: 0px;
                  margin-right: 30px;
                  min-width: 130px;
                  border: 1px solid ${theme.color.neutral.white};
                  :hover {
                    border: 1px solid #ccc;
                    .subText {
                      color: ${theme.color.brand.primary};
                    }
                  }
                }
              
                .subText {
                    text-align: right;
                    font-size: 20px;
                    color: ${theme.color.neutral.gray.j};
                }
                
                .subIcon {
                    vertical-align: middle;
                    font-size: 40px;
                    padding-right: 10px;
                    :global(svg) {
                      fill: ${theme.color.brand.primary};
                    }
                }
              `}</style>
            </Article>
            <Seo pageTitle="Follow"/>
          </React.Fragment>
        )}
      }
    />
  )
};

export default FollowPage;
