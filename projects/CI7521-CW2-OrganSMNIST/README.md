# Medical Image Classification — OrganSMNIST

This repository contains the coursework for Kingston CI7521 CW2: multi-class classification of abdominal CT OrganSMNIST images at 224x224.

Contents
- `notebooks/` — training & evaluation notebooks (TensorFlow/Keras)
- `figures/` — training curves and confusion matrices
- `models/` — saved checkpoints (optional)

Summary

13 controlled experiments were run across MLPs, from-scratch CNNs, and transfer-learning with MobileNetV2 and ResNet50. ResNet50 achieved the best generalisation in our benchmarks.

Quick start

1. Create a virtual environment and install dependencies:

```bash
python -m venv .venv
source .venv/Scripts/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

2. Open `notebooks/organ_experiments.ipynb` and run cells.

Notes for reviewers

- Training curves and a confusion matrix are included in `figures/` to summarise performance.
- If dataset licensing prevents including raw data, the notebook shows how to download and preprocess OrganSMNIST from MedMNIST.

License: MIT
