// data for the homepage
import { Router } from "express";
import { BLURPS } from "../constants";

const router = Router();

router.get("/", async (req, res) => {
  const result = {
    puppies: {
      description: null,
      images: []
    },
    about: {
      description: null
    }
  };

  result.puppies.description = await getPuppyDesc(req);
  result.puppies.images = await getPuppyImages(req);
  result.about.description = await getAboutDesc(req);

  return res.json({ data: result });
});

async function getPuppyDesc(req) {
  return await req.context.models.Blurp.findOne({
    name: BLURPS.PUPPIES
  });
}

async function getPuppyImages(req) {
  const litters = await req.context.models.Litter.find();

  const images = [];
  litters.forEach(litter => {
    images.push(...litter.images.filter(image => image.useForHomepage));
  });

  return images;
}

async function getAboutDesc(req) {
  return await req.context.models.Blurp.findOne({
    name: BLURPS.ABOUT
  });
}

export default router;
