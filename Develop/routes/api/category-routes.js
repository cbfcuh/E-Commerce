const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      inclue: [Product]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const catergoryData = await Category.findByPk(req.params.id, {
      inclue: [{ model: Product }]
    });
    if (!catergoryData) {
      res.status(404).json({ message: 'No category found with this Id.'});
      return;
    }

    res.status(200).json(catergoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destory({
      where: {
        id: req.param.id
      }
    });

    if (categoryData === 0) {
      res.status(400).json({ message: 'No category found with this ID.' });
      return;
    }

    res.status(200).json({message: 'Category successfully deleted.' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
