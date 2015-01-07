
import os, os.path
import sys
import shutil

def postBuild(site):
	htaccess_path = os.path.join(site.paths['pages'], ".htaccess")
	if os.path.isfile(htaccess_path):
		shutil.copy(htaccess_path, site.paths['build'])
