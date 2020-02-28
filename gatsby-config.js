require('dotenv').config();
const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');
const { documentToPlainTextString } = require('@contentful/rich-text-plain-text-renderer');
const { CONTENTFULL_TOKEN, CONTENTFULL_ID } = process.env;

console.log(process.env);

module.exports = {
  pathPrefix: "/nakedpodcast",
  siteMetadata: {
    title: `Nakedpoet PodCast`,
    description: ` Es un show de cultura, sociedad y comedia, donde jóvenes Dominicanos, Luigi Rodríguez, el Dr. Jonathan López y su grupo de colegas, buscan la forma de ayudar a solucionar inconvenientes cotidianos de una manera divertida, jocosa y alegre, respondiendo a sus preguntas o simplemente debatiendo de manera explícita sus situaciones. `,
    author: `Naked Poet`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    'gatsby-plugin-emotion',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: CONTENTFULL_ID,
        accessToken: CONTENTFULL_TOKEN,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
              }
            }
          }
        `,
        setup: () => {
          return {
            title: 'Naked Podcast',
            description: 'Es un show de cultura, sociedad y comedia, donde jóvenes Dominicanos, Luigi Rodríguez, el Dr. Jonathan López y su grupo de colegas, buscan la forma de ayudar a solucionar inconvenientes cotidianos de una manera divertida, jocosa y alegre, respondiendo a sus preguntas o simplemente debatiendo de manera explícita sus situaciones.',
            language: 'es',
            custom_namespaces: {
              media: 'https://www.itunes.com/dtds/podcast-1.0.dtd',
              itunes: 'https://www.itunes.com/dtds/podcast-1.0.dtd',
              spotify: 'https://www.spotify.com/ns/rss',
              googleplay: 'http://www.google.com/schemas/play-podcasts/1.0',
              fireside: 'http://fireside.fm/modules/rss/fireside',
            },
            custom_elements: [
              { 'itunes:author': 'Naked Poet' },
              { 'itunes:explicit': 'yes' },
            ],
          }
        },
        feeds: [
          {
            serialize: ({ query: { site, allContentfulEpisode } }) => {
              const result = allContentfulEpisode.edges.map(edge => {
                return Object.assign({}, {
                  title: edge.node.hed,
                  description: documentToPlainTextString(edge.node.dek.content[0]),
                  date: edge.node.createdAt,
                  author: 'Naked Poet',
                  guid: edge.node.id,
                  enclosure: {url: edge.node.audio.file.url, type: 'audio/mp3'},
                  custom_elements: [
                    {'itunes:author': 'Naked Poet'},
                    {'itunes:episodeType': 'full'},
                    {'itunes:duration': edge.node.duration},
                    {'itunes:image': {
                      _attr: {
                        href: edge.node.image.file.url
                      }
                    }},
                    {'content:encoded':  documentToHtmlString(edge.node.dek.content[0])},
                    {'itunes:summary': documentToHtmlString(edge.node.shortDek.content[0])},
                    {'itunes:explicit': edge.node.explicit ? 'yes' : 'no'},
                  ],
                })
              });
              return result;
            },
            query: `
            {
              allContentfulEpisode(sort: {order: ASC, fields: createdAt}) {
                edges {
                  node {
                    dek {
                      content {
                        content {
                          value
                          nodeType
                          marks {
                            type
                          }
                        }
                      }
                    }
                    audio {
                      file {
                        url
                        contentType
                      }
                    }
                    id
                    hed
                    shortDek {
                      content {
                        content {
                          value
                          nodeType
                          marks {
                            type
                          }
                        }
                      }
                    }
                    updatedAt
                    explicit
                    duration
                    contentful_id
                    createdAt
                    image {
                      file {
                        url
                      }
                    }
                  }
                }
              }
            }
            `,
            output: "/rss.xml",
            title: "Naked Podcast's RSS Feed",
          },
        ],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
