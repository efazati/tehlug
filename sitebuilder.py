import sys

from flask import Flask, render_template
from flask_flatpages import FlatPages
from flask_frozen import Freezer

DEBUG = True
FLATPAGES_AUTO_RELOAD = DEBUG
FLATPAGES_EXTENSION = '.md'
FLATPAGES_ROOT = '/home/tax/Workspace/test/test/'

app = Flask(__name__, static_folder='files')
app.config.from_object(__name__)
pages = FlatPages(app)
freezer = Freezer(app)
pages_list = [i for i in pages]
menu_pages = [i for i in pages_list if 'priority' in i.meta.keys()]
menu = sorted(menu_pages, key=lambda p: p.meta['priority'])

@app.route('/')
def index():
    return render_template('index.html', pages=pages, menu=menu)

@app.route('/<path:path>/')
def page(path):
	page=pages.get_or_404(path)
	print page.path
	return render_template('page.html', page=page, pages=pages, menu=menu)

@app.route('/reports/')
def reports():
	reports=[i for i in pages_list 
	if 'tags' in i.meta.keys() and 'report' in i.meta['tags']]
	return render_template('reports.html', pages=pages, 
		reports=sorted(reports, reverse=True, key=lambda p: p.meta['date']), menu=menu)

@app.route('/news/')
def news():
	news=[i for i in pages_list 
	if 'tags' in i.meta.keys() and 'news' in i.meta['tags']]
	return render_template('news.html', pages=pages, news=sorted(news, reverse=True, key=lambda p: p.meta['date']), menu=menu)

if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == "build":
        freezer.freeze()
    else:
        app.run(port=8000)