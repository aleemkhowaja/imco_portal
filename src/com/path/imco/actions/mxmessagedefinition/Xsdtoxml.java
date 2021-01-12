package com.path.imco.actions.mxmessagedefinition;

import java.io.File;
import java.io.IOException;

import javax.xml.namespace.QName;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.stream.StreamResult;

import org.apache.struts2.json.JSONException;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.xml.sax.SAXException;

import com.path.imco.bo.mxmessagedefinition.PrepareXsdTags;
import com.path.imco.vo.mxmessagedefinition.MxMessageDefinitionCO;

import jlibs.xml.sax.XMLDocument;
import jlibs.xml.xsd.XSInstance;
import jlibs.xml.xsd.XSParser;

public class Xsdtoxml {
	
	 public static void returnXmlFromXsd(MxMessageDefinitionCO messageDefinitionCO) throws ParserConfigurationException, SAXException, IOException, JSONException {
         try {
        	 File outputFile = new File(messageDefinitionCO.getXsdFile().getAbsolutePath());
        	 
        	 /**
              * Prepare tags from Xsd to Grid
              */
             PrepareXsdTags.prepareXsdTags(messageDefinitionCO);
             
             /**
              * prepare Tags parent Child
              */
             PrepareXsdTags.prepareTreeTags(messageDefinitionCO);
             
             messageDefinitionCO.setTagsCos(messageDefinitionCO.getTagsCos());
             
             // instance.
             final Document doc = loadXsdDocument(messageDefinitionCO.getXsdFile());

             
             //Find the docs root element and use it to find the targetNamespace
             final Element rootElem = doc.getDocumentElement();
             String targetNamespace = null;
             if (rootElem != null && rootElem.getNodeName().equals("xs:schema")) 
                        {
                 targetNamespace = rootElem.getAttribute("targetNamespace");
             }

             //Parse the file into an XSModel object
             org.apache.xerces.xs.XSModel xsModel = new XSParser().parse(messageDefinitionCO.getXsdFile().getAbsolutePath());

             //Define defaults for the XML generation
             XSInstance instance = new XSInstance();
             instance.minimumElementsGenerated = 1;
             instance.maximumElementsGenerated = 1;
             instance.generateDefaultAttributes = true;
             instance.generateOptionalAttributes = true;
             instance.maximumRecursionDepth = 0;
             instance.generateAllChoices = true;
             instance.showContentModel = true;
             instance.generateOptionalElements = true;
            		 
             //Build the sample xml doc
             //Replace first param to XMLDoc with a file input stream to write to file
             QName rootElement = new QName("", "Document");
            //QName rootElement = new QName(targetNamespace, "out");
             XMLDocument sampleXml = new XMLDocument(new StreamResult(outputFile), false, 4, null);
             
             instance.generate(xsModel, rootElement, sampleXml);
             messageDefinitionCO.setXmlFile(outputFile);
             
             
             
         } catch (TransformerConfigurationException e) 
                 {
             // TODO Auto-generated catch block
             e.printStackTrace();
         }
     }

     public static Document loadXsdDocument(File inputFile) {

         final DocumentBuilderFactory factory = DocumentBuilderFactory
                 .newInstance();
         factory.setValidating(false);
         factory.setIgnoringElementContentWhitespace(true);
         factory.setIgnoringComments(true);
         Document doc = null;

         try {
             final DocumentBuilder builder = factory.newDocumentBuilder();
             doc = builder.parse(inputFile);
         } catch (final Exception e) {
             e.printStackTrace();
             // throw new ContentLoadException(msg);
         }
         return doc;
     }
}
