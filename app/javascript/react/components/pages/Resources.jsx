import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import SharedLayout from '../layout/SharedLayout';
import LoadingSpinner from '../LoadingSpinner';
import Card from '../Card';
import Button from '../Button';
import AlertBanner from '../AlertBanner';
import Modal from '../Modal';
import { getResources, submitResource } from '../../datasources';

import '../../stylesheets/resources';

const CATEGORIES = [
    { value: '', label: 'All' },
    { value: 'article', label: 'Articles' },
    { value: 'book', label: 'Books' },
    { value: 'podcast', label: 'Podcasts' },
    { value: 'video', label: 'Videos' },
    { value: 'talk', label: 'Talks' },
    { value: 'newsletter', label: 'Newsletters' },
    { value: 'tool', label: 'Tools' },
    { value: 'project', label: 'Projects' },
];

const Resources = () => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [banner, setBanner] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const [formValues, setFormValues] = useState({
        title: '',
        url: '',
        description: '',
        category: 'article',
        submitted_by: '',
    });

    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getResources(activeCategory);
                setResources(data);
            } catch (error) {
                console.error('Failed to fetch resources', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [activeCategory]);

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setLoading(true);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
        if (formErrors[name]) {
            setFormErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formValues.title.trim()) errors.title = 'Title is required';
        if (!formValues.url.trim()) errors.url = 'URL is required';
        else if (!/^https?:\/\/.+/.test(formValues.url.trim())) {
            errors.url = 'Please enter a valid URL starting with http:// or https://';
        }
        if (!formValues.category) errors.category = 'Category is required';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setSubmitting(true);
        try {
            const result = await submitResource(formValues);
            if (result.status === 201) {
                setBanner({ type: 'success', message: 'Resource submitted successfully!' });
                setFormValues({
                    title: '',
                    url: '',
                    description: '',
                    category: 'article',
                    submitted_by: '',
                });
                setShowForm(false);
                // Refresh resources
                const data = await getResources(activeCategory);
                setResources(data);
            } else {
                const errors = result.json?.errors || ['Something went wrong'];
                setBanner({ type: 'error', message: errors.join(', ') });
            }
        } catch (error) {
            setBanner({ type: 'error', message: 'Failed to submit resource. Please try again.' });
        } finally {
            setSubmitting(false);
        }
    };

    const handleBannerClose = () => setBanner(null);

    const filteredResources = activeCategory
        ? resources.filter((r) => r.category === activeCategory)
        : resources;

    return (
        <>
            <Helmet>
                <title>Resources | WNB.rb</title>
            </Helmet>
            <SharedLayout>
                {banner && (
                    <AlertBanner
                        message={banner.message}
                        type={banner.type}
                        onClose={handleBannerClose}
                    />
                )}
                <div className="resources-page">
                    <section className="resources-header">
                        <div>
                            <p className="font-noto text-lg mt-2">
                                Community-suggested articles, books, podcasts and more.
                            </p>
                        </div>
                        <div>
                            <Button
                                type="primary"
                                className="suggest-btn"
                                onClick={() => setShowForm(true)}
                            >
                                Suggest a Resource
                            </Button>
                        </div>
                    </section>

                    <section className="resources-categories">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.value}
                                type="button"
                                className={`category-btn font-syne ${
                                    activeCategory === cat.value ? 'active' : ''
                                }`}
                                onClick={() => handleCategoryChange(cat.value)}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </section>

                    <section className="resources-list">
                        {loading ? (
                            <LoadingSpinner />
                        ) : filteredResources.length === 0 ? (
                            <p className="text-center font-noto text-lg">
                                {activeCategory
                                    ? `No ${activeCategory} found. Be the first to suggest one!`
                                    : 'No resources found. Be the first to suggest one!'}
                            </p>
                        ) : (
                            <div className="resources-grid">
                                {filteredResources.map((resource) => (
                                    <Card key={resource.id} className="resource-card">
                                        <div className="resource-category">{resource.category}</div>
                                        <h3 className="font-syne text-xl font-bold">
                                            <a
                                                href={resource.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {resource.title}
                                            </a>
                                        </h3>
                                        {resource.description && (
                                            <p className="font-noto text-base mt-2">
                                                {resource.description}
                                            </p>
                                        )}
                                        {resource.submitted_by && (
                                            <p className="font-noto text-sm mt-2 text-gray-500">
                                                Suggested by {resource.submitted_by}
                                            </p>
                                        )}
                                    </Card>
                                ))}
                            </div>
                        )}
                    </section>

                    <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
                        <h2 className="font-syne text-2xl font-bold mb-4">Suggest a Resource</h2>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title" className="font-besley">
                                    Title *
                                </label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    value={formValues.title}
                                    onChange={handleFormChange}
                                />
                                {formErrors.title && (
                                    <p className="error-message">{formErrors.title}</p>
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="url" className="font-besley">
                                    URL *
                                </label>
                                <input
                                    id="url"
                                    name="url"
                                    type="url"
                                    value={formValues.url}
                                    onChange={handleFormChange}
                                    placeholder="https://..."
                                />
                                {formErrors.url && (
                                    <p className="error-message">{formErrors.url}</p>
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="description" className="font-besley">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    value={formValues.description}
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="category" className="font-besley">
                                    Category *
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    value={formValues.category}
                                    onChange={handleFormChange}
                                >
                                    {CATEGORIES.filter((c) => c.value).map((cat) => (
                                        <option key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </option>
                                    ))}
                                </select>
                                {formErrors.category && (
                                    <p className="error-message">{formErrors.category}</p>
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="submitted_by" className="font-besley">
                                    Your Name *
                                </label>
                                <input
                                    id="submitted_by"
                                    name="submitted_by"
                                    type="text"
                                    value={formValues.submitted_by}
                                    onChange={handleFormChange}
                                    required
                                />
                            </div>
                            <div className="form-actions">
                                <Button type="primary" disabled={submitting} onClick={handleSubmit}>
                                    {submitting ? 'Submitting...' : 'Submit'}
                                </Button>
                                <Button type="white-and-orange" onClick={() => setShowForm(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </Modal>
                </div>
            </SharedLayout>
        </>
    );
};

export default Resources;
