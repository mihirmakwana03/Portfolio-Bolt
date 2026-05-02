# Multi-Class Classification on Imbalanced Data

Kingston CI7521 CW1 — benchmarking classical ML classifiers on an imbalanced 5-class dataset.

Contents
- `notebooks/` — Jupyter notebook reproducing preprocessing, SMOTE inside CV folds, and two-stage hyperparameter search
- `figures/` — per-class precision/recall and macro-F1 plots

Summary

Benchmarked LDA, QDA, Decision Tree, KNN, Logistic Regression, SVM, Random Forest, Gaussian NB, with leakage-free SMOTE (inside CV folds) and a quantile transformer. Macro-F1 is used for ranking.

Quick start

```bash
python -m venv .venv
source .venv/Scripts/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

Notes

- Confusion matrices and per-class reports are included in `figures/` to help reviewers validate claims.

License: MIT
