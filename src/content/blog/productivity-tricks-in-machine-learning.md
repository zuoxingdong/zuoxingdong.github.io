---
title: Productivity Tricks in Machine Learning
date: 2020-05-25
tags: [research, machine-learning, productivity]
description: Useful tricks for running many ML experiments in parallel, gathered in one place.
---

In machine learning research, one often needs to run many experiments in parallel e.g. hyperparameter search. In this post, we gather some useful tricks in one place for better productivity.

## Environment setup

- Miniconda
- JupyterLab
- Modify `~/.bashrc`
- Modify `~/.vimrc`

## Server

- `passwd`: change user password on the server
- SSH access to server via JupyterLab ([see also here](https://coderwall.com/p/ohk6cg/remote-access-to-ipython-notebooks-via-ssh))
  - On server: `$ jupyter lab --no-browser --port=8000`
  - On local: `$ ssh -N -L localhost:8001:localhost:8000 user@remote_host`
  - `-N`: specifies SSH that no remote commands to be executed
  - `-L`: port forwarding
  - Kill port: `fuser -k 8000/tcp`
- `xvfb`: fake-screen on the server
  - `xvfb-run -a -s "-screen 0 1400x900x24 +extension RANDR" --python file.py`
  - Note: it requires the nvidia driver installed with flag `--no-opengl-files` and CUDA installed with flag `--no-opengl-libs`
- Get user's memory utilization:
  - `ps -U user_name --no-headers -o rss | awk '{sum+=$1} END {print int(sum/1024/1024) "GB"}'`

## Some tools

- `htop`: CPU monitoring
- `gpustat`: GPU monitoring. On top of nvidia-smi with better visualization
- `terminator`: group all opened terminals in one place
- `flake8`: check your Python code quality with PEP8

## Misc

GitHub repo clean-up of large historical files:

- Find large items (20 largest): `git verify-pack -v .git/objects/pack/pack-{hash}.idx | sort -k 3 -n | tail -n 20`
- View the large pack object: `git rev-list --objects --all | grep {hash}`
- Branch filtering: `git filter-branch --index-filter 'git rm --cached --ignore-unmatch ./path/*.ext' --tag-name-filter cat -- --all`
- Push: `git push origin --force --all`

GitHub repo image host: use imgur, so you don't need to upload it to the repo.

Use keyboard shortcuts as much as possible: GNOME, Browser (Chrome), JupyterLab, …

Experiment parallelization:

- Make hyperparameter configuration a dictionary (one could use some function to generate a list of dicts for sweeping)
- Use `ProcessPoolExecutor` or existing libraries (e.g. Ray, lagom) to execute a run function in parallel, each for one configuration dictionary.
- Discouraged to use command line arguments (xargs), because this would increase the code complexity and also be less convenient for changing hyperparameter settings, parallelization etc.
