import { CallToActionButton } from "Components/CallToActionButton/CallToActionButton";
import { Column } from "Components/Column/Column";
import { Columns } from "Components/Columns";
import { Cover } from "Components/Cover";
import { FormspreeForm } from "Components/FormspreeForm";
import { Gallery } from "Components/Gallery/Gallery";
import { Heading } from "Components/Heading";
import { Paragraph } from "Components/Paragraph";
import { PropertyFeatures } from "Components/PropertyFeatures";
import { PropertySearch } from "Components/PropertySearch/PropertySearch";
import { TickItem } from "Components/TickItem";
import Image from "next/image";
import { theme } from "theme";

export const BlockRenderer = ({ blocks }) => {
  return blocks.map((block) => {
    switch (block.name) {
      case "acf/tickitem": {
        return (
          <TickItem key={block.id}>
            <BlockRenderer blocks={block.innerBlocks} />
          </TickItem>
        );
      }
      case "core/gallery": {
        return (
          <Gallery
            key={block.id}
            columns={block.attributes.columns || 3}
            cropImages={block.attributes.imageCrop}
            items={block.innerBlocks}
          />
        );
      }
      case "acf/propertyfeatures": {
        return (
          <PropertyFeatures
            key={block.id}
            price={block.attributes.price}
            bathrooms={block.attributes.bathrooms}
            bedrooms={block.attributes.bedrooms}
            hasParking={block.attributes.has_parking}
            petFriendly={block.attributes.pet_friendly}
          />
        );
      }
      case "acf/formspreeform": {
        return <FormspreeForm key={block.id} formId={block.attributes.data.form_id} />
      }
      case "acf/ctabutton": {
        return (
          <CallToActionButton
            key={block.id}
            label={block.attributes.data.label}
            destination={block.attributes.data.destination || "/"}
            align={block.attributes.data.align}
          />
        );
      }
      case "core/paragraph": {
        return (
          <Paragraph
            key={block.id}
            content={block.attributes.content}
            textAlign={block.attributes.textAlign}
            textColor={
              theme[block.attributes.textColor] ||
              block.attributes.style?.color?.text
            }
          />
        );
      }
      case "acf/propertysearch": {
        return <PropertySearch key={block.id} />
      }
      case "core/cover": {
        return (
          <Cover key={block.id} background={block.attributes.url}>
            {/* Recursively call BlockRenderer */}
            <BlockRenderer key={block.id} blocks={block.innerBlocks} />
          </Cover>
        );
      }
      case "core/post-title":
      case "core/heading": {
        return (
          <Heading
            key={block.id}
            level={block.attributes.level}
            textAlign={block.attributes.textAlign}
            content={block.attributes.content}
          />
        );
      }
      case "core/columns": {
        return (
          <Columns
            key={block.id}
            isStackedOnMobile={block.attributes.isStackedOnMobile}
            textColor={
              theme[block.attributes.textColor] ||
              block.attributes.style?.color?.text
            }
            backgroundColor={
              theme[block.attributes.backgroundColor] ||
              block.attributes.style?.color?.background
            }
          >
            <BlockRenderer blocks={block.innerBlocks} />
          </Columns>
        );
      }
      case "core/column": {
        return (
          <Column 
          key={block.id} 
          width={block.attributes?.width} 
          textColor={
            theme[block.attributes?.textColor] ||
            block.attributes?.style?.color?.text
          }
          backgroundColor={
            theme[block.attributes?.backgroundColor] ||
            block.attributes?.style?.color?.background
          }
          
         >
            <BlockRenderer blocks={block.innerBlocks} />
          </Column>
        );
      }
      case "core/group": {
        return <BlockRenderer key={block.id} blocks={block.innerBlocks} />;
      }
      case "core/block": {
        return <BlockRenderer key={block.id} blocks={block.innerBlocks} />;
      }
      case "core/image": {
        return (
          <Image
            key={block.id}
            src={block.attributes.url}
            width={block.attributes.width}
            height={block.attributes.height}
            alt={block.attributes.alt || ""}
          />
        );
      }
      default: {
        //console.log("UNKNOWN", block);
        return null;
      }
    }
  });
};
