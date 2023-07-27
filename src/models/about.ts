import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const aboutSchema = new Schema({
  text: String,
  image: {
    public_id: { type: String },
    url: { type: String },
  },
});

const About = models.About || model("About", aboutSchema);

export default About;
