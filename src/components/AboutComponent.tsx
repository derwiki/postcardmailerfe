import React from "react"
import {Col, Row} from "reactstrap";


const AboutComponent = () => (
    <Row>
        <Col className="col-xl-6 offset-xl-3 col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-sm-12 text-left field px-0">
            <h2 className="text-center pt-5">About</h2>
            <div>This began as a Mother's Day gift. My mother loves my photos, but hates using computers, smartphones, etc. I created this service to quickly send physical copies of my photos, and then built out the service a little more to also send to nieces and nephews. Today, I regularly send postcards to my family and close friends.</div>
            <h4 className="text-center pt-3">Why not Instagram?</h4>
            <div>As mentioned, my original audience (my mother) avoids technology. I have nieces, nephews and young cousins who are also too young to use online photo sharing services. But they love getting mail! Since launching the service, I've realized that basically everyone loves getting something in the mail that's not a bill or junk mail—even more so when it's a pretty picture!</div>
            <h4 className="text-center pt-3">Why's it free?</h4>
            <div>It's not entirely free—you get five free postcards. But to answer the question, at this point this is very much a side project and not a side hustle. I've shared it with a close circle of friends and think there's potential for this to become a product, but it's not quite there yet. So while I'm working on product/market fit, no legal entities and no credit card merchant accounts.</div>
            <h4 className="text-center pt-3">How do I get more credits?</h4>
            <div>Send me an email! I can be reached at <a href="mailto:adam@der.wiki">adam@der.wiki</a> and would love to hear more about your use case in exchange for some more credits.</div>
        </Col>
    </Row>
);

export default AboutComponent;
