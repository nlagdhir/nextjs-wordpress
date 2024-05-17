import { gql } from "@apollo/client";
import client from "client";
import { MapMainMenuItems } from "./mapMainMenuItems";
import { cleanAndTransformBlocks } from "./cleanAndTransformBlocks";

export const getPageStaticProps = async (context) => {
  const uri = context.params?.slug ? context.params?.slug.join("/") : '/';
  const { data } = await client.query({
    query: gql`
      query PageQuery($uri: String!) {
        nodeByUri(uri: $uri) {
          ... on Page {
            id
            title
            blocks(postTemplate: false)
            seo {
              title
              metaDesc
            }
          }
          ... on Property {
            id
            title
            blocks(postTemplate: false)
            seo {
              title
              metaDesc
            }
          }
        }
        
        acfOptionsMainMenu {
          mainMenu {
            callToActionButton {
              destination {
                ... on Page {
                  id
                  uri
                }
              }
              label
            }
            mainMenu {
              menuItem {
                destination {
                  ... on Page {
                    id
                    uri
                  }
                }
                label
              }
              items {
                destination {
                  ... on Page {
                    id
                    uri
                  }
                }
                fieldGroupName
                label
              }
            }
          }
        }
      }
    `,
    variables: {
      uri,
    },
  });

  return {
    props: {
      seo : data.nodeByUri.seo,
      mainMenuItems: MapMainMenuItems(
        data.acfOptionsMainMenu.mainMenu.mainMenu
      ),
      blocks: cleanAndTransformBlocks(data.nodeByUri.blocks),
      callToActionLabel:
        data.acfOptionsMainMenu.mainMenu.callToActionButton.label,
      callToActionDestination:
        data.acfOptionsMainMenu.mainMenu.callToActionButton.destination.uri,
    },
  };
};
