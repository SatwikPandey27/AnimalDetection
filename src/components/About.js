import React from 'react'

export default function About(props) {
  return (
    <div className='container'>
      <h1 className='my-3'>About Us</h1>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item" style={{backgroundColor: props.mode === 'dark'?'#4e6983':'white', color:props.mode === 'dark'?'white':'black'}}>
          {console.log(props.mode)}
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              <b>Introduction</b>
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              In rural agricultural landscapes worldwide, the coexistence of farming activities and wildlife
              habitats presents significant challenges, particularly concerning crop damage. As agricultural
              expansion encroaches upon natural habitats, mitigating harm to crops caused by wildlife becomes
              increasingly imperative. In this context, computer vision emerges as a powerful tool, offering
              innovative solutions for animal detection to safeguard agricultural lands while minimising harm to
              wildlife populations.<br/>
              This exploration delves into the intersection of computer vision and animal detection in rural
              settings, focusing on its application in crop protection. By harnessing computer vision techniques,
              such as image recognition and machine learning algorithms, farmers and researchers can gain
              real-time insights into animal behaviour, enabling proactive interventions to prevent crop damage.
              These technologies empower farmers to deploy targeted mitigation strategies, ranging from
              automated deterrent systems to precision monitoring of wildlife activity.<br />
              Moreover, this discussion examines the socio-economic implications of wildlife-related crop
              damage on rural communities, emphasising the role of computer vision in fostering sustainable
              farming practices. By reducing crop losses and minimising the need for harmful deterrent methods,
              computer vision-based animal detection technologies contribute to the resilience of rural
              economies and ecosystems. Additionally, they facilitate data-driven decision-making, empowering
              farmers to optimise resource allocation and mitigate environmental impacts.<br />
              Through case studies, research insights, and emerging trends, this exploration underscores the
              transformative potential of computer vision in crop protection. By embracing innovation and
              fostering collaboration between agriculture, technology, and conservation sectors, we can develop
              tailored solutions that balance the needs of agriculture and wildlife conservation. Ultimately, by
              leveraging computer vision for animal detection, we can promote food security, biodiversity
              conservation, and the sustainable management of rural landscapes for generations to come.
            </div>
          </div>
        </div>
        <div className="accordion-item" style={{backgroundColor: props.mode === 'dark'?'#4e6983':'white', color:props.mode === 'dark'?'white':'black'}}>
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              <b>How it Works ?</b>
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              The process begins with capturing high-quality images or video footage of the field using suitable cameras. These are then processed through advanced image recognition software, leveraging the YOLO v8 model. The model is adept at identifying individual animals against their known backgrounds, making it a robust choice for real-time object detection.<br/>
              Following data collection, a diverse dataset is curated, annotated with bounding boxes around animals of interest, and preprocessed for uniformity. YOLO v8, selected as the base model, undergoes adaptation and fine-tuning on the annotated dataset to specialize in recognizing specific animal classes. The trained model is evaluated, and upon satisfactory performance, it is deployed for real-time inference on video streams or camera feeds.<br/>
              Post-processing techniques are applied to refine predictions, and the system is continuously improved through periodic retraining with new annotated data, ensuring its efficacy in dynamic field conditions.
            </div>
          </div>
        </div>
        <div className="accordion-item" style={{backgroundColor: props.mode === 'dark'?'#4e6983':'white', color:props.mode === 'dark'?'white':'black'}}>
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              <b>Research Paper</b>
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              Will be updated soon!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
